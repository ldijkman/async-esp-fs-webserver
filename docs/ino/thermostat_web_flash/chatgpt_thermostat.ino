
// added buzzer shield on D5 GPIO14 if temp <10 or >40 buzzer

// sorry changed the pinout 
// so it fits my wemos tripple base pinout https://t.me/Luberth_Dijkman/28
// temperature from the shield DS18B20 needs offset

// Buzzer shield  control port, default D5 = GPIO 14  ( i had to solder a connection on print for D5)
// Temp DS18B20 Shield                  D2 = GPIO 4
// Relais shield default                D1 = GPIO 5
// onboard LED                          D4 = GPIO 2 (think no good for relais used for flashing,  cannot flash program the board when relays is connected) 

/*
const int oneWireBus = 4; // gpio4     yellow=data     red=3.3v      black/blue=GND

const int relayPin = 5;     // gpio5 aliexpress d1 mini relais shield
const int LED_PIN = 2; // wemos D1 Mini onboard LED

*/



// Join My Telegram Channel?
//     https://t.me/Luberth_Dijkman

// wifi thermostat and  off delay timed light switch
// lolin wemos v2 relais shield has solderpads for other pin config
// to add a second relais

/* 
   based on 
      https://github.com/Gianbacchio/ESP8266-TelegramBot
      https://github.com/CasaJasmina/TelegramBot-Library
      https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot
      https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot/tree/master/examples
      https://randomnerdtutorials.com/telegram-control-esp32-esp8266-nodemcu-outputs/
      https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/
*/


// should be possible to set setpoint from telegram buttons 15 and 20 celsius
//    https://youtu.be/n8N7pnrjb2A

// https://t.me/s/Luberth_Dijkman
// video https://t.me/Luberth_Dijkman/15

// added bottom menu scan mdns for other ESP devices in telegram
//     https://t.me/Luberth_Dijkman/18

// added Telegram fault notification message to phone
// telegram app for adroid phone 
//      https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=nl&gl=US
// Telegram for PC Desktop
//      https://desktop.telegram.org/
// configure telegram 


// playing with buttons in Telegram Message
//       https://youtu.be/-IC-Z78aTOs
//       https://github.com/witnessmenow/Simple-Home-Automation-With-Telegram/blob/master/LedControl/LedControl.ino







// configure your BOT


// https://t.me/botfather
// Telegram BOT Token (Get from Botfather)
// Use magnify search find on main telegram
// search for @Botfather
// /newbot
#define BOT_TOKEN "xxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"


// https://t.me/myidbot?start=getid
// Use magnify search find on main telegram
// search for @idbot
// /getid
#define CHAT_ID "xxxxxxxxxx"




// if you cannot get telegram Bot to work
//    maybe try and play first with
//           https://randomnerdtutorials.com/telegram-control-esp32-esp8266-nodemcu-outputs/











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


// Android Phone / Tablet Bonjour mDNS Scanner
// Easy find your ESP devices on Android
// https://play.google.com/store/apps/details?id=de.wellenvogel.bonjourbrowser&pli=1


#include <time.h>
//#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP8266mDNS.h> // Include the mDNS library

#include <ESP8266WiFi.h>

#include <WiFiClientSecure.h>
#include <ESP8266HTTPClient.h>
#include <UniversalTelegramBot.h>     // manage libraries, 
                                      // search for Universal Telegram Bot Library
                                      // https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot
#include <ArduinoJson.h>

// Function declaration
void buzzer();


// Replace with your network WiFi Router credentials
const char* ssid = "Bangert_30_Andijk";      // wifi router name broadcasted in the air
const char* password = "ookikwilerin";       // your password

const char* mDNS_adress = "thermostat";  // .local is added by ESP

String externalIP = ""; // Global variable to store the external IP address

// Global variable to store the reset reason as a string
String resetReasonStr;
uint32_t freeStack;
uint32_t freeHeap;

//int timeoffset= 7200; // 2 hours in seconds time offset for Holland / The Nederlands

unsigned long lightTimerExpires;
boolean lightTimerActive = false;

bool RestartTriggered = false;
int numNewMessages=0;

const String keyboardJson;


X509List cert(TELEGRAM_CERTIFICATE_ROOT);
WiFiClientSecure secured_client;
UniversalTelegramBot bot(BOT_TOKEN, secured_client);



// GPIO where the DS18B20 is connected
const int oneWireBus = 4; // gpio4     yellow=data     red=3.3v      black/blue=GND
// needs a 4k7 resistor between data and 3.3v https://duckduckgo.com/?t=lm&q=DS18B20+resistor
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

// GPIO where the relay is connected
// const int relayPin = 16;     // gpio16  gpio2=LED gives error on tx on my board
// const int relayPin = 5;   // wemos D1 mini relais shield has D1(GPIO5) i think
const int relayPin = 5;     // gpio5 aliexpress d1 mini relais shield
const int LED_PIN = 2; // wemos D1 Mini onboard LED



#define BUZZER_PIN  14  //D5 // GPIO14


unsigned long previousMillis = 0;
unsigned long interval = 500; // Interval between tone changes

int tone1Duration = 250; // Duration of the first tone
int tone2Duration = 250; // Duration of the second tone

int currentTone = LOW; // Initial tone state








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

    if (message.startsWith(F("setpoint:"))) {
      String setpointStr = message.substring(strlen("setpoint:"));
      float newSetpoint = setpointStr.toFloat();

      // Validate the new setpoint
      if (newSetpoint >= 10.0 && newSetpoint <= 25.0) {
        temperatureSetpoint = newSetpoint;
        Serial.print(F("New temperature setpoint received and accepted: "));
        Serial.println(temperatureSetpoint);

        // Broadcast the new setpoint to all connected clients
        String confirmationMessage = "setpoint:" + String(temperatureSetpoint);
        server->textAll(confirmationMessage.c_str());
      } else {
        Serial.print(F("Received setpoint out of range: "));
        Serial.println(newSetpoint);
        // Optionally, send a message back to the client indicating the rejection
      }
    }
  }
}




void getExternalIP() {
  WiFiClient client; // Create a WiFiClient object
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;  //Declare an object of class HTTPClient

    http.begin(client, "http://api.ipify.org");  //Specify request destination with WiFiClient
    int httpCode = http.GET();  //Send the request

    if (httpCode > 0) { //Check the returning code
      externalIP = http.getString();   //Update the global variable with the external IP
       Serial.print(F("externalIP "));
       Serial.println(externalIP);
    } else {
      Serial.printf("Failed to retrieve IP, error: %s\n", http.errorToString(httpCode).c_str());
      Serial.println(F("Failed to retrieve IP"));
    }

    http.end();   //Close connection
  } else {
    Serial.println(F("Error in WiFi connection"));
  }
}




void printResetReason() {
   rst_info *resetInfo = ESP.getResetInfoPtr();
  Serial.print(F("Reset reason: "));
  switch (resetInfo->reason) {
    case 0:
    resetReasonStr=F("Power on reset");
      Serial.println(resetReasonStr);
      break;
    case 1:
    resetReasonStr=F("Hardware watch dog reset");
      Serial.println(resetReasonStr);
      break;
    case 2:
    resetReasonStr=F("Exception reset");
      Serial.println(resetReasonStr);
      break;
    case 3:
    resetReasonStr=F("Software watch dog reset");
      Serial.println(resetReasonStr);
      break;
    case 4:
    resetReasonStr=F("Software restart");
      Serial.println(resetReasonStr);
      break;
    case 5:
    resetReasonStr=F("Wake up from deep-sleep");
      Serial.println(resetReasonStr);
      break;
    case 6:
    resetReasonStr=F("External system reset");
      Serial.println(resetReasonStr);
      break;
    default:
    resetReasonStr=F("Unknown reset reason");
      Serial.println(resetReasonStr);
      break;
  }
}














void setup() {
  Serial.begin(115200);
  
  pinMode(relayPin, OUTPUT);    // Initialize the relay pin as an output
  digitalWrite(relayPin, LOW);  // Start with the relay off

  
  pinMode(LED_PIN, OUTPUT);     // Initialize the relay pin as an output
  digitalWrite(LED_PIN, HIGH);  // Start with the LED high is off 

 pinMode(BUZZER_PIN, OUTPUT);


  WiFi.begin(ssid, password);
  secured_client.setTrustAnchors(&cert); // Add root certificate for api.telegram.org
// Only required on 2.5 Beta
// client.setInsecure();

  
  // longPoll keeps the request to Telegram open for the given amount of seconds if there are no messages
  // This hugely improves response time of the bot, but is only really suitable for projects
  // where the the initial interaction comes from Telegram as the requests will block the loop for
  // the length of the long poll
   bot.longPoll = 2;  // 60 looks like blocks my loop



  
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println(F("Connecting to WiFi..."));
  }
  Serial.println(F("Connected to WiFi"));

  // Print the IP address
  Serial.print(F("IP Address: "));
  Serial.println(WiFi.localIP());

  getExternalIP();


  // Start the DS18B20 sensor
  sensors.begin();

  // Initialize mDNS
  if (!MDNS.begin(mDNS_adress)) { // Start the mDNS responder for http://thermostat.local
    Serial.println(F("Error setting up MDNS responder!"));
  } else {
    Serial.println(F("mDNS responder started"));
    // Print the mDNS address
    Serial.print(F("mDNS Address: http://"));
    Serial.print(mDNS_adress);
     Serial.println(F(".local"));

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
    request->send(404, "text/html", F("<h2>Page Not Found!</h2><p>Go back to the <a href='/'>homepage</a>.</p>"));
  });

//////////////////////////////////////////////////////////////
// looks like next is needed for Telegram notifications
Serial.print(F("Retrieving time: "));
configTime(0, 0, "pool.ntp.org", "time.nist.gov"); // Improved NTP server configuration with a 2-hour time offset

time_t now = time(nullptr);
while (now < 24 * 3600) {
    Serial.print(".");
    delay(1000);
    now = time(nullptr);
}

//////////////////////////////////////////
// Set the timezone and DST rules
//////////////////////////////////////////

// Set the timezone and DST rules for Central European Time (CET) with DST
setenv("TZ", "CET-1CEST,M3.5.0,M10.5.0/3", 1);

// Set the timezone and DST rules for Eastern Standard Time (EST) with DST
//setenv("TZ", "EST5EDT,M3.2.0,M11.1.0", 1);

// Set the timezone and DST rules for Australian Eastern Standard Time (AEST) with DST
//setenv("TZ", "AEST-10AEDT,M10.1.0,M4.1.0/3", 1);

// Set the timezone and DST rules for Japan Standard Time (JST) with no DST
//setenv("TZ", "JST-9", 1);

// Set the timezone and DST rules for Indian Standard Time (IST) with no DST
//setenv("TZ", "IST-5:30", 1);

// Set the timezone and DST rules for Brasilia Time (BRT) with no DST
//setenv("TZ", "BRT3", 1);

// Set the timezone and DST rules for Central Standard Time (CST) with DST
//setenv("TZ", "CST6CDT,M3.2.0,M11.1.0", 1);


tzset(); // Update the timezone settings


// Convert the time to a struct tm
struct tm *timeinfo;
timeinfo = localtime(&now);

// Print the time in human-readable format
Serial.println();
Serial.print(F("Current time: "));
Serial.print(asctime(timeinfo)); // asctime() converts the time to a string in the format: Day Mon Date Hours:Minutes:Seconds Year\n

// For more control over formatting, use strftime() instead:
char buffer[80];
strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", timeinfo);
Serial.print(F("Formatted time: "));
Serial.println(buffer);
//////////////////////////////////////////////////////////////

 // Print the last reset reason
  printResetReason();


Serial.println(F("send bot bottom menu button"));
// Menu button in send area
/*
  const String commands = F("["
                            "{\"command\":\"options\",  \"description\":\"Thermostat Control Menu\"},"
                            "{\"command\":\"start\", \"description\":\"Start\"},"
                             "{\"command\":\"scan\", \"description\":\"Scan network for other ESP mDNS\"},"
                            "{\"command\":\"set_10\", \"description\":\"Temp Setpoint 10 °C\"},"
                            "{\"command\":\"set_15\", \"description\":\"Temp Setpoint 15 °C\"},"
                            "{\"command\":\"set_18\", \"description\":\"Temp Setpoint 18 °C\"},"
                            "{\"command\":\"set_20\", \"description\":\"Temp Setpoint 20 °C\"},"
                            "{\"command\":\"set_21\", \"description\":\"Temp Setpoint 21 °C\"},"
                          
                            "{\"command\":\"status\",\"description\":\"Answer device current status\"}" // no comma on last command
                            "]");
  bot.setMyCommands(commands);
  */

 //bot.sendCommand("/reset");

  // make it better readable with less \ https://www.blackbox.ai/
  const String commands = F(R"(
[
  {"command":"menu", "description":"Thermostat Control Menu"},
  {"command":"options", "description":"Thermostat Control Menu"},
  {"command":"buzzer", "description":"Test buzzer"},
  {"command":"start", "description":"Start"},
  {"command":"scan", "description":"Scan network for other ESP mDNS"},
  {"command":"set_10", "description":"Temp Setpoint 10 °C"},
  {"command":"set_15", "description":"Temp Setpoint 15 °C"},
  {"command":"set_18", "description":"Temp Setpoint 18 °C"},
  {"command":"set_20", "description":"Temp Setpoint 20 °C"},
  {"command":"set_21", "description":"Temp Setpoint 21 °C"},
  {"command":"reboot", "description":"Reboot / Restart"},
  {"command":"status","description":"Answer device current status"}
]
)");
bot.setMyCommands(commands);
// Menu button in send area


// make it better readable with less \ https://www.blackbox.ai/



Serial.println(F("send bot start info"));
String message = (F("Thermostat started \n"));
message += F("WiFi Network: ") + String(ssid)+ "\n";
message += F("Local URL: http://") + String(mDNS_adress) + ".local\n";
message += F("Local IP: http://") + WiFi.localIP().toString() + "\n";
message += F("External IP: ") + externalIP + F("\nReset reason ") + resetReasonStr+" " + asctime(timeinfo)+"\n";

bot.sendMessage(CHAT_ID, message.c_str(), "");

Serial.println(F("send bot menu"));

  // make it better readable with less \ https://www.blackbox.ai/
const String keyboardJson = F(R"(
[[
  {"text":"ON","callback_data":"ON"},
  {"text":"OFF","callback_data":"OFF"}
],[
  {"text":"1 Min","callback_data":"TIME1"},  
  {"text":"5 Min","callback_data":"TIME5"},    
  {"text":"10 Min","callback_data":"TIME10"},  
  {"text":"15 Min","callback_data":"TIME15"},
  {"text":"30 Min","callback_data":"TIME30"},
  {"text":"1 Hr","callback_data":"TIME60"}
],[
  {"text":"10 °C","callback_data":"TEMP10"},
  {"text":"15 °C","callback_data":"TEMP15"},
  {"text":"18 °C","callback_data":"TEMP18"},
  {"text":"20 °C","callback_data":"TEMP20"},
  {"text":"21 °C","callback_data":"TEMP21"}
],[
  {"text":"Scan","callback_data":"/scan"},
  {"text":"Reboot","callback_data":"/reboot"}
]]
)");
     
        bot.sendMessageWithInlineKeyboard(CHAT_ID, F("Thermostat Control\nhttps://t.me/s/Luberth_Dijkman"), "", keyboardJson);
 
 Serial.println(F("send bot temp info"));
// Assuming temperatureSetpoint is a float
// Assuming currentTemperature holds the current temperature
bot.sendMessage(CHAT_ID, asctime(timeinfo), "");

int freeContStack = ESP.getFreeContStack();
int freeHeap = ESP.getFreeHeap();
message = F("Setpoint: ") + String(temperatureSetpoint, 1) + F("°C, Current Temp: ") + String(sensors.getTempCByIndex(0), 1) + "°C\n     Stack: " + String(freeContStack) + " bytes, Heap: " + String(freeHeap) + " bytes";

bot.sendMessage(CHAT_ID, message.c_str(), "");


 // Print the last reset reason
  printResetReason();


Serial.println(F("server begin"));

buzzer();
  
  server.begin();

}



void buzzer(){
  tone(BUZZER_PIN, 1000, tone1Duration);    // Play the first tone (1000 Hz for tone1Duration milliseconds) 
  delay(tone1Duration + 10);                // Wait for the duration of the first tone plus a little extra to ensure it's fully played

  tone(BUZZER_PIN, 2000, tone2Duration);    // Play the second tone (2000 Hz for tone2Duration milliseconds)
  delay(tone2Duration + 10);                // Wait for the duration of the second tone plus a little extra
}



// Scan local network for other ESP mDNS devices
void browseService(const char* service, const char* proto) {
  Serial.println("");
  //Serial.printf("Scan _%s._%s.local. ... ", service, proto);
  Serial.printf("Scan mDNS... ");//_%s._%s.local. ... ", service, proto);
  int n = MDNS.queryService(service, proto);  // Query mDNS service
  if (n == 0) {
    Serial.print("\033[31m"); //red
    Serial.println(F("\nDamn, no services found\n Flash more Devices\n  And give each a Unique mDNS name in Setup tab Custom"));
    Serial.print("\033[0m"); // Reset color
    
    // Now send 'telegramMessage' via your Telegram bot
    bot.sendMessage(CHAT_ID, F("Damn, no other ESP mDNS devices found\n Flash more ESP Devices\nhttps://ldijkman.github.io/async-esp-fs-webserver/"), "");
  } else {
    Serial.print(n);
    Serial.println(F(" service(s) found"));
/*
    // Create a JSON array to hold service details
    DynamicJsonDocument doc(1024);
    JsonArray services = doc.to<JsonArray>();
*/  String telegramMessage="";
    for (int i = 0; i < n; ++i) {
      // Print details for each service found


      // added http so that it is clickable in webserial monitor https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html
      // Obtain the hostname and convert it to lowercase uppercase no clickable link in webserial monitor
      // https://github.com/xtermjs/xterm.js/issues/4964
      // Create a String object from the MDNS hostname and convert it to lowercase
      String hostnameLower = MDNS.hostname(i);  // Obtain the hostname as a String
      hostnameLower.toLowerCase();              // Convert the hostname to lowercase


      // Now print the details, using the lowercase hostname
      //Serial.printf("   %d: http://%s - http://%s port:%d\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str(), MDNS.port(i));
      Serial.print("\033[32m"); // Set green color (other color codes available)
      Serial.printf("   %d: http://%s - http://%s\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str());
      Serial.print("\033[0m"); // Reset color

      // Serial.printf("  %d: http://%s - http://%s port:%d\n", i + 1, (MDNS.hostname(i).c_str()).toLowerCase(), MDNS.IP(i).toString().c_str(), MDNS.port(i));
      // make ip clickable weblink addon doenst do :port
      // http://Living.local uppercase L does not work
      // https://github.com/xtermjs/xterm.js/issues/4964
    // Assuming you have a function to send a message via Telegram
    // and a String variable 'telegramMessage' to accumulate the message content
  
    telegramMessage += String(i + 1) + ": http://" + hostnameLower + " - http://" + MDNS.IP(i).toString() + "\n";
    
 
   
    }    
    // Now send 'telegramMessage' via your Telegram bot
    bot.sendMessage(CHAT_ID, telegramMessage, "");
    telegramMessage="";
/*
      // Add service details to the JSON array
      JsonObject serviceObj = services.createNestedObject();

      serviceObj["mdnsname"] = MDNS.hostname(i);
      serviceObj["ip"] = MDNS.IP(i).toString();
      serviceObj["port"] = MDNS.port(i);
    }

    // Serialize the JSON array to a string
    String message;
    serializeJson(doc, message);

    // Send the JSON string to all connected WebSocket clients
    ws.textAll(message.c_str());

 */
  }
 
  String message = F("Scan Done    Stack: ") + String(ESP.getFreeContStack()) + F(" bytes, Heap: ") + String(ESP.getFreeHeap()) + F(" bytes");
  bot.sendMessage(CHAT_ID, message, "");
  message ="";
  Serial.println();
}






void handleNewMessages(int numNewMessages) {

 
  // make it better readable with less \ https://www.blackbox.ai/ 
const String keyboardJson = F(R"(
[[
  {"text":"ON","callback_data":"ON"},
  {"text":"OFF","callback_data":"OFF"}
],[
  {"text":"1 Min","callback_data":"TIME1"},  
  {"text":"5 Min","callback_data":"TIME5"},    
  {"text":"10 Min","callback_data":"TIME10"},  
  {"text":"15 Min","callback_data":"TIME15"},
  {"text":"30 Min","callback_data":"TIME30"},
  {"text":"1 Hr","callback_data":"TIME60"}
],[
  {"text":"10 °C","callback_data":"TEMP10"},
  {"text":"15 °C","callback_data":"TEMP15"},
  {"text":"18 °C","callback_data":"TEMP18"},
  {"text":"20 °C","callback_data":"TEMP20"},
  {"text":"21 °C","callback_data":"TEMP21"}
],[
  {"text":"Scan","callback_data":"/scan"},
  {"text":"Reboot","callback_data":"/reboot"}
]]
)");
  for (int i = 0; i < numNewMessages; i++) {
      Serial.print(F("bot.messages[i].text "));
      Serial.println(bot.messages[i].text);

    // If the type is a "callback_query", a inline keyboard button was pressed
    if (bot.messages[i].type ==  F("callback_query")) {
      String text = bot.messages[i].text;

      
      Serial.print(F("Call back button pressed with text: "));
      Serial.println(text);
      // ws.textAll(F("Telegram button Recieved ") + text); 


      if (text == F("ON")) {
        digitalWrite(LED_PIN, LOW);
        bot.sendMessage(CHAT_ID, F("LED ON"), "");
      } else if (text == F("OFF")) {
        digitalWrite(LED_PIN, HIGH);
        bot.sendMessage(CHAT_ID, F("LED OFF"), "");
      } else if (text.startsWith("TIME")) {
        text.replace("TIME", "");
        int timeRequested = text.toInt();      
         digitalWrite(LED_PIN, LOW);       
         bot.sendMessage(CHAT_ID, F("LED ON, off delay ")+String(timeRequested)+F(" Minutes"), "");
         lightTimerActive = true;
         lightTimerExpires = millis() + (timeRequested * 1000 * 60);
      }else if (text.startsWith("TEMP")) {
        text.replace("TEMP", "");
        temperatureSetpoint = text.toInt();
        
        String message = F("Setpoint: ") + String(temperatureSetpoint, 1) + F("°C, Current Temp: ") + String(sensors.getTempCByIndex(0), 1) + "°C\n     Stack: " + String(ESP.getFreeContStack()) + " bytes, Heap: " + String(ESP.getFreeHeap()) + " bytes";
        bot.sendMessage(CHAT_ID, message.c_str(), "");

      }

      if (text == F("/scan")) {
        bot.sendMessage(CHAT_ID, F("Scan local network for other ESP mDNS device"), "");
        browseService("http", "tcp");  // find other mdns devices in network
      }

      if (text == F("/reboot")) {
        bot.sendMessage(CHAT_ID, F("Sorry, Reboot / Restart turned off in code\n Gets into boot loop"), "");
/* keeps rebooting
      
        bot.sendMessage(chat_id, "Rebooting now...", "");
        delay(1000);                                      // Short delay to ensure message delivery
        RestartTriggered = true;                          // flag used in loop to restart ESP
*/        
      }
     
    } else {
      String chat_id = String(bot.messages[i].chat_id);
      String text = bot.messages[i].text;

      if (text == F("/options")||text == F("/menu")) {

        // Keyboard Json is an array of arrays.
        // The size of the main array is how many row options the keyboard has
        // The size of the sub arrays is how many coloums that row has

        // "The Text" property is what shows up in the keyboard
        // The "callback_data" property is the text that gets sent when pressed  
        String message = "Thermostat \n";
        message += "WiFi Network: " + String(ssid)+ "\n";
        message += "Local URL: http://" + String(mDNS_adress) + ".local\n";
        message += "Local IP: http://" + WiFi.localIP().toString() + "\n";
        message += "External IP: " + externalIP + "\nReset reason " + resetReasonStr+"\n";
        
        bot.sendMessage(chat_id, message.c_str(), "");
        
  
        bot.sendMessageWithInlineKeyboard(chat_id, "Thermostat Control\nhttps://t.me/s/Luberth_Dijkman", "", keyboardJson);
 
        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
        bot.sendMessage(chat_id, message.c_str(), "");
      
      }

      // When a user first uses a bot they will send a "/start" command
      // So this is a good place to let the users know what commands are available
      if (text == F("/start")) {

        bot.sendMessage(chat_id, "/options or /menu : returns the inline keyboard\n", "Markdown");
      }

      if (text.startsWith("/set_")) {  // set temp from menu button sendarea
        text.replace("/set_", "");
        temperatureSetpoint = text.toInt();
        
        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        String message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
        bot.sendMessage(chat_id, message.c_str(), "");
      }

      if (text == F("/reboot")) {
        bot.sendMessage(chat_id, F("Sorry, Reboot / Restart turned off in code\n Gets into boot loop"), "");
/* keeps rebooting
      
        bot.sendMessage(chat_id, "Rebooting now...", "");
        delay(1000);                                      // Short delay to ensure message delivery
        RestartTriggered = true;                          // flag used in loop to restart ESP
*/        
      }


      if (text == "/scan") {
        bot.sendMessage(chat_id, F("Scan local network for other ESP mDNS device"), "");
        browseService("http", "tcp");  // find other mdns devices in network
      }

      if (text == "/buzzer") {
        bot.sendMessage(chat_id, F("Buzzer test D5"), "");
        buzzer();
      }




    }
  }
}











int delayBetweenChecks = 1000;
unsigned long lastTimeChecked;   //last time messages' scan has been done
static unsigned long lastMillis = 0;


void loop() {

   sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
      if (temperature < 10 || temperature > 40) {
    buzzer();
  }

  
  if (millis() > lastTimeChecked + delayBetweenChecks)  {



     ws.cleanupClients();


    // getUpdates returns 1 if there is a new message from Telegram
    int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    
    Serial.println(F("numNewMessages ") + String(numNewMessages));

    if (numNewMessages) {
      Serial.println(F("got response"));
      handleNewMessages(numNewMessages);
    }

    lastTimeChecked = millis();

    if (lightTimerActive && millis() > lightTimerExpires) {
     lightTimerActive = false;
      digitalWrite(LED_PIN, HIGH);
      bot.sendMessage(CHAT_ID, F("LED OFF delay Time Expired"), "");
    }

  }

   if (RestartTriggered == true) {ESP.restart();}




  

  if (millis() - lastMillis > 5000) {  // delay without Delay(), do it every 5 seconds
    lastMillis = millis();

  // Get free stack and heap memory
   freeStack = ESP.getFreeContStack();
   freeHeap = ESP.getFreeHeap();
  
  // Print memory info
  Serial.print(F("Free stack: "));
  Serial.print(freeStack);
  Serial.println(" bytes");
  Serial.print(F("Free heap: "));
  Serial.print(freeHeap);
  Serial.println(F(" bytes"));
    
    sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
    String tempString = String(temperature, 1);

 


    // Print the IP address
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.print("mDNS Address: ");
    Serial.print("http://");
    Serial.print(mDNS_adress);
    Serial.println(".local");
    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
    String ip = "IP: http://" + WiFi.localIP().toString();
    ws.textAll(ip.c_str());                          // Send the string to all connected WebSocket clients.
    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
      String mDNS = F("mDNS: http://") + String(mDNS_adress)+".local"; // Corrected to use 'mDNS_adress'
    ws.textAll(mDNS.c_str());                        // Send the string to all connected WebSocket clients.

    Serial.print(F("Current temperature: "));
    Serial.print(tempString);
    Serial.println(" °C");
    Serial.print(F("Current setpoint: "));
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
    // String relayStateMessage = "relays:" + String(relayState ? "ON" : "OFF"); // Converts boolean to "1" or "0"
    ws.textAll(relayStateMessage.c_str());
    // Construct the setpoint message
    String setpointMessage = "setpoint:" + String(temperatureSetpoint);
    ws.textAll(setpointMessage.c_str());


   

  }
  MDNS.update(); // Keep the mDNS responder updated
}
