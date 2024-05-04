
// chang4ed relaispin
// GPIO where the relay is connected
// const int relayPin = 16; // gpio16  gpio2=LED gives error on tx i think on my board, cannot flash program the board when relays is connected


// https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/ino/thermostat_web_flash

// for ESP8266
// asked chatgpt for a on/off websocket thermostat
// maybe a bit based on https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/
// i loaded ChatGPT with above example
// and asked ChatGPT for changes on that code
// Start the mDNS responder for http://thermostat.local

// should play a sound when  WARNING: WARNING Temperature < 10 or > 40
// should turnoff heating if sensor lost, or maxtime heating on

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
const int oneWireBus = 4; // gpio4     yellow=data     red=3.3v      black/blue=GND
// needs a 4k7 resistor between data and 3.3v https://duckduckgo.com/?t=lm&q=DS18B20+resistor
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

// GPIO where the relay is connected
const int relayPin = 16;     // gpio16  gpio2=LED gives error on tx on my board
// const int relayPin = 5;   // wemos D1 mini relais shield has D1(GPIO5) i think

// Hysteresis margin, prevent pinball machine effect
// deadband around the setpoint, prevent rapid toggling.
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
  <title>Thermostat, ESP8266 WiFi Thermostat DS18B20 Temperature Sensor</title>
   <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/ldijkman/async-esp-fs-webserver/master/docs/ino/thermostat_web_flash/thermo_icon.png">
   <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
  
    body {
      margin: 0;
      padding: 0;
      background-color: #303030; /* Dark grey background */
      border: 5px solid black; /* Default border color */
      /* Ensure the border doesn't affect layout size (optional) */
      box-sizing: border-box;
    }
    
    #temperature{
      color: yellow;
    }

    #setpoint{
      color: orange;
    }
    
    #setpointInput {
      width: 120px; /* Adjust input width as necessary */
      border: 2px solid #007bff; /* Blue border for input */
      text-align: center; /* Ensure text is centered */
      font-size: 2em; /* Increase font size for better visibility */
      border-radius: 5px; /* Adds rounded corners to the buttons */
    }

    #currentTime{
      padding: 4px; 
      font-weight: bold;
      font-size: 1.5em;
      color: lightgray;
     
    }

   .button {  
      width: 50px; /* Width to match the input height for aesthetic consistency */
      background-color: #9DA1A5; /* Blue background for buttons */
      cursor: pointer; /* Change cursor to pointer to indicate clickable */  
      font-size: 1.7em; /* Ensure buttons are also easily readable */
      border-radius: 5px; /* Adds rounded corners to the buttons */
}
    
    #wsMessages {
      max-height: 200px;
      width: 300px;
      text-align: left; /* Aligns text to the left */
      padding-left: 10px; /* Adds some space on the left for better readability */
      overflow-y: auto;
      border-radius: 5px; /* Adds rounded corners to the buttons */
    }

  </style> 
  
  <script>
    var ws;
    function initWebSocket() {
      ws = new WebSocket('ws://' + window.location.hostname + '/ws');
      ws.onopen = function(event) {
        console.log('WebSocket connected');
        prependMessageWithTimestamp("<font style='color:green;'>WebSocket connected</font>");
        document.body.style.borderColor = 'green'; // Connected: green body border background
      };
      ws.onclose = function(event) {
        console.log('WebSocket disconnected');
        prependMessageWithTimestamp("<font style='color:red;'>WebSocket disconnected</font>");

        document.body.style.borderColor = 'red'; // Disconnected: red body border background
        // Attempt to reconnect after a timeout
        setTimeout(initWebSocket, 2000);
      };


ws.onmessage = function(event) {
  console.log('Message Received:', event.data);
  var data = event.data.split(':');
  if (data[0] === "temperature") {
    var temperature = parseFloat(data[1]);
    document.getElementById("temperature").innerHTML = temperature + " <span id='relayStatus'></span>";

       // Check if the temperature is < 10 or > 40 and play the alert sound
        if (temperature < 10 || temperature > 40) {
            var alertSound = document.getElementById("alertSound");
            alertSound.play();
            console.warn("WARNING temperature < 10 || temperature > 40 ");
            prependMessageWithTimestamp('<font style="color:red;">WARNING temperature < 10 || temperature > 40</font>');
        }
  } else if (data[0] === "setpoint") {
    document.getElementById("setpoint").innerHTML =  data[1] ;
    document.getElementById("setpointInput").value = data[1];
  } else if (data[0] === "relays") {
    // Assume relay state is sent as "1" for on and "0" for off
    var relayIsOn = data[1] === "1";
    updateRelayStatus(relayIsOn);
  } else if (data[0] === "IP") {
    var ipString =  data[1]+':'+data[2]; ; // also splits at http:  Use the IP address as a string
    //console.log('data[1]', data[1]);
    // Create a clickable link that opens the IP address in a new tab
    var message = "<a href='" + ipString + "' target='_blank'>" + ipString + "</a>";
    prependMessageWithTimestamp(message);  
  }else if (data[0] === "mDNS") {
    var mDNSString = data[1]+':'+data[2]; // also splits at http:
    //console.log('data[1]', data[1]);
    // Create a clickable link that opens in a new tab
    var message = "<a href='" + mDNSString + "' target='_blank'>" + mDNSString + "</a>";
    prependMessageWithTimestamp(message);  
  }


  prependMessageWithTimestamp(event.data);
        
    // Re-check the relay state each time temperature is updated, in case the relay status span was overwritten
    // updateRelayStatus(relayState); // Ensure relayState is kept up to date elsewhere in your code or retrieved from this function
};



    }


    function prependMessageWithTimestamp(message) {
    // Create a timestamp for the message
    var now = new Date();
    var timestamp = ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);

    // Display the message with timestamp in the wsMessages div
    var wsMessages = document.getElementById("wsMessages");
    // Prepend new messages with timestamp to the top
    var newMessage = "[" + timestamp + "] " + message + "<br>";
    wsMessages.innerHTML = newMessage + wsMessages.innerHTML;

    // Limit the number of lines (messages) to 360
    var lines = wsMessages.innerHTML.split("<br>");
    if (lines.length > 360) {
        lines = lines.slice(0, 360); // Keep only the newest 360 lines
        wsMessages.innerHTML = lines.join("<br>");
    }
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

  // Round the value to one decimal place
  validatedValue = Math.round(validatedValue * 10) / 10;
  
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
     prependMessageWithTimestamp('WebSocket is not open.');
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
<h2><a href="http://thermostat.local" style="color:lightgray; text-decoration:none;">ESP8266 WiFi Thermostat DS18B20</a></h2>
  <h1><span id="temperature">--</span> °C <span id="relayStatus"></span></h1>
  <h1>Setpoint: <span id="setpoint">--</span> °C</h1>
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
    <br><br>
    <div id="currentTime"></div>
  <div id="wsMessages" style="margin-top:20px;padding:10px;background:#f9f9f9;border:1px solid #ddd;"></div>  
    
    <br><br><br><br><br><br>
    </center>    

<script src="https://ldijkman.github.io/async-esp-fs-webserver/foother.js"></script>
<script src="https://ldijkman.github.io/Ace_Seventh_Heaven/console.js"></script>






<audio id="alertSound" src="https://github.com/ldijkman/async-esp-fs-webserver/raw/master/docs/ino/thermostat_web_flash/sound.mp3" type="audio/mp3"></audio>
<script>
    function updateCurrentTime() {
      var now = new Date();
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
      var dayName = days[now.getDay()];
      var monthName = months[now.getMonth()];
      var dayNumber = now.getDate();
      var currentTimeFormatted = dayName + ' ' + dayNumber + ' ' + monthName + ' ' + 
                                 ('0' + now.getHours()).slice(-2) + ':' + 
                                 ('0' + now.getMinutes()).slice(-2) + ':' + 
                                 ('0' + now.getSeconds()).slice(-2);
      document.getElementById("currentTime").innerHTML = "" + currentTimeFormatted;
    }

    // Update the time immediately and every second thereafter
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
</script>
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

  // Serve the HTML page for mdns overview page from mdns scan
  server.on("/bulb.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send_P(200, "text/html", index_html);
  });

  // Handle Not Found
  server.onNotFound([](AsyncWebServerRequest * request) {
    request->send(404, "text/html", "<h2>Page Not Found!</h2><p>Go back to the <a href='/'>homepage</a>.</p>");
  });

  server.begin();
}

void loop() {
  static unsigned long lastMillis = 0;

  if (millis() - lastMillis > 5000) {  // delay without Delay(), do it every 5 seconds
    lastMillis = millis();
    sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
    String tempString = String(temperature, 1);




    // Print the IP address
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("mDNS Address: ");
    Serial.println("http://thermostat.local");

    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
    String ip = "IP: http://" + WiFi.localIP().toString();
    ws.textAll(ip.c_str());                          // Send the string to all connected WebSocket clients.
    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
    String mDNS = "mDNS: http://thermostat.local";
    ws.textAll(mDNS.c_str());                        // Send the string to all connected WebSocket clients.

    Serial.print("Current temperature: ");
    Serial.print(tempString);
    Serial.println(" °C");
    Serial.print("Current setpoint: ");
    Serial.print(temperatureSetpoint);
    Serial.println(" °C\n");


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
