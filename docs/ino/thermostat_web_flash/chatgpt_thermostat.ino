
// https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/ino/thermostat_web_flash

// for ESP8266
// asked chatgpt for a on/off websocket thermostat
// maybe a bit based on https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/
// i loaded ChatGPT with above example
// and asked ChatGPT for changes on that code
// Start the mDNS responder for http://thermostat.local

// should play a sound when  WARNING: WARNING Temperature < 10 or > 40

// setpoint minimum input 10 maximum input 25

#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266mDNS.h> // Include the mDNS library

// Replace with your network WiFi Router credentials
const char* ssid = "Bangert_30_Andijk";      // wiwfi router name broadcasted in the air
const char* password = "ookikwilerin";       // your password

// GPIO where the DS18B20 is connected
const int oneWireBus = 4; // yellow=data     red=3.3v      black/blue=GND
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

// GPIO where the relay is connected
const int relayPin = 2; // Example pin 2=LED on Wemos
// Hysteresis margin
const float hysteresisMargin = 0.1;  // switchpoint +0.1 and -0.1
static bool relayState = false; // Keeps track of the current relay state


// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// Temperature setpoint, initialized with a default value
float temperatureSetpoint = 20.0;

// HTML content with JavaScript for WebSocket communication
const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html>
<head>
<!--
// for ESP8266
// asked chatgpt for a on/off websocket thermostat
// maybe a bit based on https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/
// maybe a start
// Start the mDNS responder for http://thermostat.local
-->
  <title>ESP8266 WiFi Thermostat DS18B20 Temperature Sensor</title>
   <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/ldijkman/async-esp-fs-webserver/master/docs/ino/thermostat_web_flash/thermo_icon.png">
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
       /* Blue background for buttons */
       background-color: #9DA1A5;  
     
      /* White text for buttons */
      /* color: white; */
      /* No border for a cleaner look */
      /* border: none; */
      cursor: pointer; /* Change cursor to pointer to indicate clickable */  
      font-size: 1.7em; /* Ensure buttons are also easily readable */
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
  console.log('Message Received:', event.data);
  var data = event.data.split(':');
  if (data[0] === "temperature") {
    var temperature = parseFloat(data[1]);
    document.getElementById("temperature").innerHTML = temperature + " °C <span id='relayStatus'></span>";
    
    // Re-check the relay state each time temperature is updated, in case the relay status span was overwritten
    updateRelayStatus(relayState); // Ensure relayState is kept up to date elsewhere in your code or retrieved from this function
  } else if (data[0] === "setpoint") {
    document.getElementById("setpoint").innerHTML = "Setpoint: " + data[1] + " °C";
    document.getElementById("setpointInput").value = data[1];
  } else if (data[0] === "relays") {
    // Assume relay state is sent as "1" for on and "0" for off
    var relayIsOn = data[1] === "1";
    updateRelayStatus(relayIsOn);
  }
};



    }
    
function updateRelayStatus(isOn) {
  var statusElement = document.getElementById("relayStatus");
  if (isOn) {
    statusElement.innerHTML = "<span style='color: red;'>●</span>"; // Red circle when relay is on
  } else {
    // Use a span with a border to create an outline circle
    statusElement.innerHTML = "<span style='display: inline-block; width: 10px; height: 10px; border: 2px solid blue; border-radius: 50%;'></span>";
  }
}
    
function sendSetpoint(value) {
  var minValue = 10; // Define the minimum setpoint value
  var maxValue = 25; // Define the maximum setpoint value
  var validatedValue = parseFloat(value); // Parse the input value to a float
  
  // Check if the parsed value is less than the minimum or greater than the maximum
  if(validatedValue < minValue) {
    validatedValue = minValue; // Set to minimum if below the allowed range
  } else if(validatedValue > maxValue) {
    validatedValue = maxValue; // Set to maximum if above the allowed range
  }
  
  // Update the input field to reflect the corrected value
  document.getElementById('setpointInput').value = validatedValue;
  
  // Send the validated setpoint value to the server via WebSocket
  if(ws.readyState === WebSocket.OPEN) {
    ws.send('setpoint:' + validatedValue); // Send the validated setpoint
    console.log('ws.send setpoint:', validatedValue); // Log for debugging
  } else {
    console.log('WebSocket is not open.'); // Log if the WebSocket connection is not open
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
<h2>ESP8266 WiFi Thermostat</h2>
  <h3>DS18B20 Temperature Sensor</h3> 
  <h1 id="temperature">-- °C <span id="relayStatus"></span></h1>
  <h1 id="setpoint">Setpoint: -- °C</h1>
    <input type="button" class="button" value="-" onclick="adjustSetpoint(-0.1)" />
  <input type="number" id="setpointInput" min="10" max="25" step="0.1" onchange="sendSetpoint(this.value)" placeholder="Set Temperature" value="20"/> <input type="button" class="button" value="+" onclick="adjustSetpoint(0.1)" />
    <br>
    <br><br><br>
<!-- Preset temperature setpoint buttons -->
<input type="button" class="button preset" value="14°" onclick="sendSetpoint(14)" />&emsp;
<input type="button" class="button preset" value="15°" onclick="sendSetpoint(15)" />&emsp;
<input type="button" class="button preset" value="16°" onclick="sendSetpoint(16)" />&emsp;
<input type="button" class="button preset" value="17°" onclick="sendSetpoint(17)" />&emsp;
<input type="button" class="button preset" value="18°" onclick="sendSetpoint(18)" /><br>
<br>
<input type="button" class="button preset" value="19°" onclick="sendSetpoint(19)" />&emsp;
<input type="button" class="button preset" value="20°" onclick="sendSetpoint(20)" />&emsp;
<input type="button" class="button preset" value="21°" onclick="sendSetpoint(21)" />&emsp;
<input type="button" class="button preset" value="22°" onclick="sendSetpoint(22)" />
    <br><br><br><br>    <br><br><br><br>
    </center>    
       <script src="https://ldijkman.github.io/async-esp-fs-webserver/foother.js"></script>
<script src="https://ldijkman.github.io/Ace_Seventh_Heaven/console.js"></script>
<audio id="alertSound" src="https://github.com/ldijkman/async-esp-fs-webserver/raw/master/docs/ino/thermostat_web_flash/sound.mp3" type="audio/mp3"></audio>
</body>
</html>)rawliteral";

// WebSocket event handler
void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client,
               AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_DATA) {
    data[len] = 0; // Ensure the incoming data is null-terminated
    String message = String((char*)data);

    if (message.startsWith("setpoint:")) {
      String setpointStr = message.substring(strlen("setpoint:"));
      float newSetpoint = setpointStr.toFloat();

      // Validate the new setpoint
      if (newSetpoint >= 10.0 && newSetpoint <= 25.0) {
        temperatureSetpoint = newSetpoint;
        Serial.print("New temperature setpoint received and accepted: ");
        Serial.println(temperatureSetpoint);

        // Broadcast the new setpoint to all connected clients
        String confirmationMessage = "setpoint:" + String(temperatureSetpoint);
        server->textAll(confirmationMessage.c_str());
      } else {
        Serial.print("Received setpoint out of range: ");
        Serial.println(newSetpoint);
        // Optionally, send a message back to the client indicating the rejection
      }
    }
  }
}

void setup() {
  Serial.begin(115200);


  pinMode(relayPin, OUTPUT); // Initialize the relay pin as an output
  digitalWrite(relayPin, LOW); // Start with the relay off



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
    Serial.print("Current setpoint: ");
    Serial.print(temperatureSetpoint);
    Serial.println(" °C");


    // Implement hysteresis control
    if (!relayState && temperature < (temperatureSetpoint - hysteresisMargin)) {
      digitalWrite(relayPin, HIGH); // Activate the relay if temperature goes below the lower threshold
      relayState = true; // Update relay state
    } else if (relayState && temperature > (temperatureSetpoint + hysteresisMargin)) {
      digitalWrite(relayPin, LOW); // Deactivate the relay if temperature goes above the upper threshold
      relayState = false; // Update relay state
    }

    // No change if the temperature is within the hysteresis band

    // Send the temperature to all connected clients
    String message = "temperature:" + tempString;
    ws.textAll(message.c_str());
    // Inside your loop(), replace the relay state message construction and sending part with:
    String relayStateMessage = "relays:" + String(relayState ? "1" : "0"); // Converts boolean to "1" or "0"
    ws.textAll(relayStateMessage.c_str());
    // Construct the setpoint message
    String setpointMessage = "setpoint:" + String(temperatureSetpoint);
    ws.textAll(setpointMessage.c_str());

  }
  MDNS.update(); // Keep the mDNS responder updated
}
