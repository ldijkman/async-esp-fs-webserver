
// https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/ino/thermostat_web_flash

// for ESP8266
// asked chatgpt for a on/off websocket thermostat
// maybe a start
// Start the mDNS responder for http://thermostat.local


#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266mDNS.h> // Include the mDNS library

// Replace with your network credentials
const char* ssid = "Bangert_30_Andijk";
const char* password = "password";

// GPIO where the DS18B20 is connected
const int oneWireBus = 4; 
OneWire oneWire(oneWireBus);
DallasTemperature sensors(&oneWire);

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// Temperature setpoint, initialized with a default value
float temperatureSetpoint = 20.0;

// HTML content with JavaScript for WebSocket communication
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
  <title>Temperature Monitor</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    var ws;
    function initWebSocket() {
      ws = new WebSocket('ws://' + window.location.hostname + '/ws');
      ws.onmessage = function(event) {
        document.getElementById("temperature").innerHTML = event.data + " °C";
      };
    }
    function sendSetpoint(value) {
      ws.send('setpoint:' + value);
    }
    window.onload = initWebSocket;
  </script>
</head>
<body>
  <h2>DS18B20 Temperature</h2> 
  <h3 id="temperature">-- °C</h3>
  <input type="number" step="0.1" onchange="sendSetpoint(this.value)" placeholder="Set Temperature" value="20"/>
</body>
</html>)rawliteral";

// WebSocket event handler
void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, 
               AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("WebSocket client connected");
  } else if (type == WS_EVT_DATA) {
    data[len] = 0; // Ensure null-termination
    String message = (char*)data;
    if (message.startsWith("setpoint:")) {
      String setpointStr = message.substring(9);
      temperatureSetpoint = setpointStr.toFloat();
      Serial.print("New temperature setpoint received: ");
      Serial.println(temperatureSetpoint);
    }
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  
  // Print the IP address
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Start the DS18B20 sensor
  sensors.begin();

  // Initialize mDNS
  if (!MDNS.begin("thermostat")) { // Start the mDNS responder for http://thermostat.local
    Serial.println("Error setting up MDNS responder!");
  } else {
    Serial.println("mDNS responder started");
     // Print the mDNS address
    Serial.print("mDNS Address: ");
    Serial.println("http://thermostat.local"); 

    // Add service to mDNS-SD
    MDNS.addService("http", "tcp", 80);
  }

  // Initialize WebSocket
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);

  // Serve the HTML page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  server.begin();
}

void loop() {
  static unsigned long lastMillis = 0;
  if (millis() - lastMillis > 5000) {
    lastMillis = millis();
    sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
    String tempString = String(temperature, 1);
    Serial.print("Current temperature: ");
    Serial.print(tempString);
    Serial.println(" °C");
    // Send current temperature to all connected clients
    ws.textAll(tempString);
  }
  MDNS.update(); // Keep the mDNS responder updated
}
