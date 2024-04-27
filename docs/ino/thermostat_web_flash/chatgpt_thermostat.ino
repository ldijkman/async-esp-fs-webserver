
// https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/ino/thermostat_web_flash

// for ESP8266
// asked chatgpt for a on/off websocket thermostat
// maybe a bit based on https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/
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
const char* password = "ookikwilerin";

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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    
    #setpointInput {
      width: 120px; /* Adjust input width as necessary */
      border: 2px solid #007bff; /* Blue border for input */
      text-align: center; /* Ensure text is centered */
      font-size: 2em; /* Increase font size for better visibility */
    }
 
    .button {  
      width: 50px; /* Width to match the input height for aesthetic consistency */
      background-color: #007bff; /* Blue background for buttons */
      color: white; /* White text for buttons */
      border: none; /* No border for a cleaner look */
      cursor: pointer; /* Change cursor to pointer to indicate clickable */
    
      font-size: 2em; /* Ensure buttons are also easily readable */
    }

  </style> 
  <script>
    var ws;
    function initWebSocket() {
      ws = new WebSocket('ws://' + window.location.hostname + '/ws');
      ws.onopen = function(event) {
        console.log('WebSocket connected');
        document.body.style.backgroundColor = 'green'; // Connected: green background
      };
      ws.onclose = function(event) {
        console.log('WebSocket disconnected');
        document.body.style.backgroundColor = 'red'; // Disconnected: red background
        // Attempt to reconnect after a timeout
        setTimeout(initWebSocket, 2000);
      };


ws.onmessage = function(event) {
  var data = event.data.split(':');
  if (data[0] === "temperature") {
    document.getElementById("temperature").innerHTML = data[1] + " °C";
  } else if (data[0] === "setpoint") {
    document.getElementById("setpoint").innerHTML = "Setpoint: " + data[1] + " °C";
    document.getElementById("setpointInput").value = data[1]; // Ensure this line correctly updates the input value
  }
};

    }
   function sendSetpoint(value) {
    if(ws.readyState === WebSocket.OPEN) {
        ws.send('setpoint:' + value);
    } else {
        console.log('WebSocket is not open.');
    }
}



    function adjustSetpoint(delta) {
      var inputField = document.getElementById('setpointInput');
      var currentValue = parseFloat(inputField.value);
      var newValue = currentValue + delta;
      inputField.value = newValue.toFixed(1);
      sendSetpoint(newValue);
    }
    window.onload = initWebSocket;
  </script>
</head>
<body>
<center>
  <h2>DS18B20 Temperature</h2> 
  <h3 id="temperature">-- °C</h3>
  <h3 id="setpoint">Setpoint: -- °C</h3>
    <input type="button" class="button" value="-" onclick="adjustSetpoint(-0.1)" />
  <input id="setpointInput" type="number" step="0.1" min="10" max="30" onchange="sendSetpoint(this.value)" placeholder="Set Temperature" value="20"/>
  <input type="button" class="button" value="+" onclick="adjustSetpoint(0.1)" />
    <br><br><br><br><br>
    </center>    
       <script src="https://ldijkman.github.io/async-esp-fs-webserver/foother.js"></script>
<script src="https://ldijkman.github.io/Ace_Seventh_Heaven/console.js"></script>
</body>
</html>)rawliteral";

// WebSocket event handler
void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client,
               AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("WebSocket client connected");

    // Send the current setpoint to the newly connected client
    String message = "setpoint:" + String(temperatureSetpoint);
    client->text(message);
  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("WebSocket client disconnected");
  } else if (type == WS_EVT_DATA) {
    data[len] = 0; // Ensure the incoming data is null-terminated
    String message = String((char*)data);

    if (message.startsWith("setpoint:")) {
      String setpointStr = message.substring(strlen("setpoint:"));
      temperatureSetpoint = setpointStr.toFloat();
      Serial.print("New temperature setpoint received: ");
      Serial.println(temperatureSetpoint);

      // Broadcast the new setpoint to all connected clients
      String confirmationMessage = "setpoint:" + String(temperatureSetpoint);
      server->textAll(confirmationMessage.c_str());
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
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
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

    // Inside the loop() function, where you send the temperature
    String message = "temperature:" + tempString;
    ws.textAll(message.c_str());
  }
  MDNS.update(); // Keep the mDNS responder updated
}
