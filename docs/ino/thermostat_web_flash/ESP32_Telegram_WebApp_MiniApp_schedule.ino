


// 4mb ESP32 Wroom version
// compiled this esp32 dev board
// lots of things turned off // remarked
// but does some things







// maybe needs my modifeid version of
// https://github.com/ldijkman/Universal-Arduino-Telegram-Bot
// added webapp send web app data
// https://t.me/Luberth_Dijkman/84




// you can run the code on bare board Wemos d1 mini 4mb esp8266
// and amybe on many more ESP8266 Board
// you do not need the shields to program/run the code



// Join My Telegram Channel?
//     https://t.me/Luberth_Dijkman



// 4mb wemos d1 mini ESP8266 12E / 12F
//     https://t.me/Luberth_Dijkman/22
//     https://www.google.com/search?q=+wemos+d1+mini+ESP8266+12E+%2F+12F
// for test Flashed a 16mb version with 4mb settings
//     https://t.me/Luberth_Dijkman/61

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

  chat gpt says
  The pinout for a Wemos D1 Mini (an ESP8266-based development board) typically looks like this:
  https://t.me/Luberth_Dijkman/28

  D0 -> GPIO16
  D1 -> GPIO5
  D2 -> GPIO4
  D3 -> GPIO0
  D4 -> GPIO2
  D5 -> GPIO14
  D6 -> GPIO12
  D7 -> GPIO13
  D8 -> GPIO15
  TX -> GPIO1
  RX -> GPIO3
  A0 -> Analog input

  https://t.me/Luberth_Dijkman/28
*/





// wifi thermostat and  off delay timed light switch
// lolin wemos v2 relais shield has solderpads for other pin config
// to add a second relais

/*
   based on
      https://github.com/Gianbacchio/ESP8266-TelegramBot
      https://github.com/CasaJasmina/TelegramBot-Library
      https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot
      https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot/tree/master/examples
      channel  https://t.me/arduino_telegram_library
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

/*

  ____        _           _____             __ _
  |  _ \      | |         / ____|           / _(_)
  | |_) | ___ | |_ ______| |     ___  _ __ | |_ _  __ _
  |  _ < / _ \| __|______| |    / _ \| '_ \|  _| |/ _` |
  | |_) | (_) | |_       | |___| (_) | | | | | | | (_| |
  |____/ \___/ \__|       \_____\___/|_| |_|_| |_|\__, |
                                                 __/ |
                                                |___/

*/
// Configure your BOT
// Create a Bot on Telegram    help message https://t.me/Luberth_Dijkman/55
//
// go to
// https://t.me/botfather
// ask for /newbot
// answer the questions
// and you get Telegram BOT Token (Get from Botfather)
// watch this video  https://youtu.be/6ehNbx6aFtk
//
#define BOT_TOKEN "xxxxxxxxxx:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"



// help message  https://t.me/Luberth_Dijkman/57
// go to
// https://t.me/myidbot
// ask for /getid
// watch this video  https://youtu.be/6ehNbx6aFtk
//
#define CHAT_ID "xxxxxxxxxx"




// Home image for your Home Bot profile (Manage Bot. (click on image to change))
//   https://raw.githubusercontent.com/ldijkman/async-esp-fs-webserver/master/docs/ino/thermostat_web_flash/Home_Bot.png





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



// Include the Library: "LITTLEFS.h"
// The ESP32 environment requires a specific LittleFS library for ESP32,
// which is not bundled with the ESP32 core by default.
// You have to install it manually. The library can be found here:
// https://github.com/lorol/LITTLEFS. Follow the installation instructions provided in the repository.

//Correct Initialization: After installing the correct LittleFS library for ESP32, include it at the top of your sketch:

//#include "LITTLEFS.h"  // Note the capitalization

#include "FS.h"
//LITTLEFS FS; // Create a LittleFS object


#include <time.h>

// For ESP8266, you might be using ESPAsyncTCP.h and ESPAsyncWebServer.h
// For ESP32, use:
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include <OneWire.h>
#include <DallasTemperature.h>
// For ESP8266: #include <ESP8266mDNS.h>
// Change to:
#include <ESPmDNS.h>

// For ESP8266: #include <ESP8266WiFi.h>
// Change to:
#include <WiFi.h>

#include <WiFiClientSecure.h>

#include "esp_heap_caps.h"

//#include <ESP8266HTTPClient.h>
#include <HTTPClient.h>

#include <UniversalTelegramBot.h>  // manage libraries,
// search for Universal Telegram Bot Library
// https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot

// maybe needs my modifeid version of
// https://github.com/ldijkman/Universal-Arduino-Telegram-Bot
// added webapp send web app data
// https://t.me/Luberth_Dijkman/84




#include <EEPROM.h>

#include <ArduinoJson.h>  // Make sure you have the ArduinoJson library


WiFiClientSecure secured_client;
UniversalTelegramBot bot(BOT_TOKEN, secured_client);




// Function declaration
void buzzer();

/*
  __          ___ ______ _    _____             __ _
  \ \        / (_)  ____(_)  / ____|           / _(_)
  \ \  /\  / / _| |__   _  | |     ___  _ __ | |_ _  __ _
   \ \/  \/ / | |  __| | | | |    / _ \| '_ \|  _| |/ _` |
    \  /\  /  | | |    | | | |___| (_) | | | | | | | (_| |
     \/  \/   |_|_|    |_|  \_____\___/|_| |_|_| |_|\__, |
                                                     __/ |
                                                    |___/

*/

// Replace with your network WiFi Router credentials
const char *ssid = "Bangert_30_Andijk";  // wifi router name broadcasted in the air
const char *password = "ookikwilerin";   // your password


struct tm *timeinfo;


const char *mDNS_adress = "thermostat";  // .local is added by ESP

String externalIP = "";  // Global variable to store the external IP address

// Global variable to store the reset reason as a string
String resetReasonStr;
uint32_t freeStack;
uint32_t freeHeap;

//int timeoffset= 7200; // 2 hours in seconds time offset for Holland / The Nederlands

unsigned long lightTimerExpires;
boolean lightTimerActive = false;
int timeRequested;

bool RestartTriggered = false;
int numNewMessages = 0;

struct Task {
  int taskNumber;
  String time;
  int duration;
};

// Assuming a maximum of 4 tasks as per your requirement
const int maxTasks = 4;
Task tasks[maxTasks];

bool manual = 0;

// Ensure you allocate enough space for the entire JSON string
// used next for url parameter test
// char bottomkeyboardJson[1024];


// GPIO where the DS18B20 is connected
const int oneWireBus = 4;  // D2=gpio4     yellow=data     red=3.3v      black/blue=GND
// needs a 4k7 resistor between data and 3.3v https://duckduckgo.com/?t=lm&q=DS18B20+resistor
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

// GPIO where the relay is connected
// const int relayPin = 16;     // gpio16  gpio2=LED gives error on tx on my board
// const int relayPin = 5;   // wemos D1 mini relais shield has D1(GPIO5) i think
const int relayPin = 5;  // gpio5 aliexpress d1 mini relais shield
const int LED_PIN = 2;   // wemos D1 Mini onboard LED



#define BUZZER_PIN 14  // D5 = GPIO14










// Hysteresis margin, prevent pinball machine effect
// deadband around the setpoint, prevent rapid toggling.
const float hysteresisMargin = 0.1;  // switchpoint +0.1 and -0.1
static bool relayState = false;      // Keeps track of the current relay state


// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// Temperature setpoint, initialized with a default value
float temperatureSetpoint = 20.0;









// make it better readable with less \ https://www.blackbox.ai/
const char keyboardJson[] PROGMEM = R"rawliteral(
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
   {"text":"Buzzer","callback_data":"/buzzer"},
  {"text":"Reboot","callback_data":"reboot"}
]]
)rawliteral";







// make it better readable with less \ https://www.blackbox.ai/
const char commands[] PROGMEM = R"rawliteral(
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
)rawliteral";


//String bottomkeyboardJson = "[[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]]";
// Define the JSON keyboard layout as a constant character array in program memory
//const char bottomkeyboardJson[] PROGMEM = R"rawliteral(JSON([[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]])JSON")rawliteral";;

const char bottomkeyboardJson[] PROGMEM = R"RAW(
[
  ["Menu", "ON", "OFF", "Task"],
  ["1Min", "5Min", "10Min", "15Min", "30Min", "60Min"],
  ["10°", "15°", "16°", "17°", "18°", "19°", "20°", "21°", "22°"],
  [
    "Reboot", "Time", "Buzzer", "Info",
    {"text": "web_app", "web_app": {"url": "https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/Telegram_WebApp.html"}},
    {"text": "web_app", "web_app": {"url": "https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/schedule.html"}}
  ]
]
)RAW";


// maybe needs my modifeid version of
// https://github.com/ldijkman/Universal-Arduino-Telegram-Bot
// added webapp send web app data
// https://t.me/Luberth_Dijkman/84





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
    data[len] = 0;  // Ensure the incoming data is null-terminated
    String message = String((char *)data);

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
  WiFiClient client;                    // Create a WiFiClient object
  if (WiFi.status() == WL_CONNECTED) {  //Check WiFi connection status
    HTTPClient http;                    //Declare an object of class HTTPClient

    http.begin(client, "http://api.ipify.org");  //Specify request destination with WiFiClient
    int httpCode = http.GET();                   //Send the request

    if (httpCode > 0) {               //Check the returning code
      externalIP = http.getString();  //Update the global variable with the external IP
      Serial.print(F("externalIP "));
      Serial.println(externalIP);
    } else {
      Serial.printf("Failed to retrieve IP, error: %s\n", http.errorToString(httpCode).c_str());
      Serial.println(F("Failed to retrieve IP"));
    }

    http.end();  //Close connection
  } else {
    Serial.println(F("Error in WiFi connection"));
  }
}




#include "esp_system.h"  // Include ESP32 system header

void printResetReason() {
  esp_reset_reason_t reset_reason = esp_reset_reason();  // Get the reset reason
  Serial.print(F("Reset reason: "));
  switch (reset_reason) {
    case ESP_RST_POWERON:  // Power on reset
      resetReasonStr = F("Power on reset");
      break;
    case ESP_RST_EXT:  // Reset by external pin
      resetReasonStr = F("External system reset");
      break;
    case ESP_RST_SW:  // Software reset via esp_restart
      resetReasonStr = F("Software restart");
      break;
    case ESP_RST_PANIC:  // Software reset due to exception/panic
      resetReasonStr = F("Exception reset");
      break;
    case ESP_RST_INT_WDT:  // Reset (software or hardware) due to interrupt watchdog
      resetReasonStr = F("Hardware watch dog reset");
      break;
    case ESP_RST_TASK_WDT:  // Reset due to task watchdog
      resetReasonStr = F("Software watch dog reset");
      break;
    case ESP_RST_WDT:  // Reset due to other watchdogs
      resetReasonStr = F("Other watchdog reset");
      break;
    case ESP_RST_DEEPSLEEP:  // Wake up from deep-sleep
      resetReasonStr = F("Wake up from deep-sleep");
      break;
    case ESP_RST_BROWNOUT:  // Brownout reset (software or hardware)
      resetReasonStr = F("Brownout reset");
      break;
    case ESP_RST_SDIO:  // Reset over SDIO
      resetReasonStr = F("Reset over SDIO");
      break;
    default:
      resetReasonStr = F("Unknown reset reason");
      break;
  }
  Serial.println(resetReasonStr);
}









void readTasksFromEEPROM() {
  int addr = 0;  // Start reading at the beginning of EEPROM
  for (int i = 0; i < maxTasks; i++) {
    EEPROM.get(addr, tasks[i].taskNumber);
    addr += sizeof(int);

    int hour, minute;
    hour = EEPROM.read(addr);
    addr++;
    minute = EEPROM.read(addr);
    addr++;

    // Convert hour and minute back to String HH:MM
    tasks[i].time = String(hour / 10) + String(hour % 10) + ":" + String(minute / 10) + String(minute % 10);

    EEPROM.get(addr, tasks[i].duration);
    addr += sizeof(int);
  }
}

void writeTasksToEEPROM() {
  int addr = 0;  // Start writing at the beginning of EEPROM
  for (int i = 0; i < maxTasks; i++) {
    EEPROM.put(addr, tasks[i].taskNumber);
    addr += sizeof(int);  // Move to the next address

    // Assuming time is stored as a String HH:MM, convert and store as two bytes
    int hour = tasks[i].time.substring(0, 2).toInt();
    int minute = tasks[i].time.substring(3, 5).toInt();
    EEPROM.write(addr, hour);
    addr++;  // Next address
    EEPROM.write(addr, minute);
    addr++;  // Next address

    EEPROM.put(addr, tasks[i].duration);
    addr += sizeof(int);  // Move to the next address
  }
  EEPROM.commit();  // Make sure to commit changes to EEPROM
}

void deleteTask(int taskNumber) {
  bool found = false;
  for (int i = 0; i < maxTasks; i++) {
    // If the task is found, mark as found and start shifting remaining tasks
    if (tasks[i].taskNumber == taskNumber) {
      found = true;
    }

    // Shift tasks to "delete" the task from the array
    if (found && i < maxTasks - 1) {
      tasks[i] = tasks[i + 1];
    }
  }

  // If the last task was deleted or a shift was made, clear the last task
  if (found) {
    tasks[maxTasks - 1].taskNumber = 0;  // Indicate an empty slot
    tasks[maxTasks - 1].time = "";
    tasks[maxTasks - 1].duration = 0;

    writeTasksToEEPROM();  // Update EEPROM storage
  }
}

















void setup() {
  Serial.begin(115200);

  EEPROM.begin(512);  // Allocate 512 bytes for EEPROM, adjust size as needed

  readTasksFromEEPROM();


  //if (!LITTLEFS.begin(true)) {
  //  Serial.println("An error has occurred while mounting LITTLEFS");
  //  return;
  //}



  pinMode(relayPin, OUTPUT);    // Initialize the relay pin as an output
  digitalWrite(relayPin, LOW);  // Start with the relay off


  pinMode(LED_PIN, OUTPUT);     // Initialize the relay pin as an output
  digitalWrite(LED_PIN, HIGH);  // Start with the LED high is off

  pinMode(BUZZER_PIN, OUTPUT);



  /*
 * next  send bot token and chat id as url parameter to webapp 
  snprintf(bottomkeyboardJson, sizeof(bottomkeyboardJson), R"RAW(
[
  ["Menu", "ON", "OFF", "Task"],
  ["1Min", "5Min", "10Min", "15Min", "30Min", "60Min"],
  ["10°", "15°", "16°", "17°", "18°", "19°", "20°", "21°", "22°"],
  [
    "Reboot", "Time", "Buzzer", "Info",
    {"text": "web_app", "web_app": {"url": "https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/Telegram_WebApp.html?bot_token=%s&chat_id=%s"}},
    {"text": "web_app", "web_app": {"url": "https://ldijkman.github.io/async-esp-fs-webserver/ino/thermostat_web_flash/Telegram_WebApp/schedule.html?bot_token=%s&chat_id=%s"}}
  ]
]
)RAW", BOT_TOKEN, CHAT_ID, BOT_TOKEN, CHAT_ID);

  // Debug print to serial
  Serial.println(bottomkeyboardJson);

*/




  WiFi.begin(ssid, password);

  // secured_client.setTrustAnchors(&cert); // Add root certificate for api.telegram.org

  secured_client.setInsecure();  // Not recommended for production, only for testing

  // Only required on 2.5 Beta
  // client.setInsecure();
  // X509List cert(TELEGRAM_CERTIFICATE_ROOT);
  // WiFiClientSecure secured_client;
  // UniversalTelegramBot bot(BOT_TOKEN, secured_client);

  WiFiClientSecure secured_client;
  // Make sure to set up the secure client for ESP32, might require setting up certificates or bypassing them:
  secured_client.setInsecure();  // Not recommended for production, but can be used for testing


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
  if (!MDNS.begin(mDNS_adress)) {  // Start the mDNS responder for http://thermostat.local
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
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  // Serve the HTML page for mdns overview page from mdns scan
  server.on("/bulb.html", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send_P(200, "text/html", index_html);
  });

  // Handle Not Found
  server.onNotFound([](AsyncWebServerRequest *request) {
    request->send(404, "text/html", F("<h2>Page Not Found!</h2><p>Go back to the <a href='/'>homepage</a>.</p>"));
  });

  //////////////////////////////////////////////////////////////
  // looks like next is needed for Telegram notifications
  Serial.print(F("Retrieving time: "));
  configTime(0, 0, "pool.ntp.org", "time.nist.gov");  // Improved NTP server configuration with a 2-hour time offset

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


  tzset();  // Update the timezone settings


  // Convert the time to a struct tm
  // struct tm *timeinfo;
  timeinfo = localtime(&now);

  // Print the time in human-readable format
  Serial.println();
  Serial.print(F("Current time: "));
  Serial.print(asctime(timeinfo));  // asctime() converts the time to a string in the format: Day Mon Date Hours:Minutes:Seconds Year\n

  // For more control over formatting, use strftime() instead:
  char buffer[80];
  strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", timeinfo);
  Serial.print(F("Formatted time: "));
  Serial.println(buffer);
  //////////////////////////////////////////////////////////////

  // Print the last reset reason
  printResetReason();

  // bot.sendCommand("/reset");





  // Menu button in send area
  Serial.println(F("send bot bottom menu button"));

  bot.setMyCommands(commands);
  // Menu button in send area



  // static persistent menu at bottom ?

  // String bottomkeyboardJson = "[[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]]";
  // Define the JSON keyboard layout as a constant character array in program memory
  // const char bottomkeyboardJson[] PROGMEM = R"JSON([[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]])JSON";
  // bot.sendMessageWithReplyKeyboard(CHAT_ID, "Create Static Menu", "", bottomkeyboardJson, true);

  bool resizeKeyboard = true;
  bool oneTimeKeyboard = false;
  bool forceReply = false;

  bot.sendMessageWithReplyKeyboard(CHAT_ID, "Create Static Menu", "", bottomkeyboardJson, resizeKeyboard, oneTimeKeyboard, forceReply);
  Serial.println(F("send bottom bot menu "));


  Serial.println(F("send bot start info"));
  String message = (F("Thermostat started \n"));
  message += F("WiFi Network: ");
  message += String(ssid);
  message += F("\n");

  message += F("Local URL: http://");
  message += String(mDNS_adress);
  message += F(".local\n");

  message += F("Local IP: http://");
  message += WiFi.localIP().toString();
  message += F("\n");
  message += F("External IP: ");
  message += externalIP;
  message += F("\nReset reason ");
  message += resetReasonStr;
  message += F(" ");
  message += asctime(timeinfo);
  message += F("\n");

  bot.sendMessage(CHAT_ID, message.c_str(), "");

  Serial.println(F("send message area bot menu"));
  bot.sendMessageWithInlineKeyboard(CHAT_ID, F("Thermostat Control\nhttps://t.me/s/Luberth_Dijkman"), "", keyboardJson);

  Serial.println(F("send bot temp info"));
  // Assuming temperatureSetpoint is a float
  // Assuming currentTemperature holds the current temperature
  bot.sendMessage(CHAT_ID, asctime(timeinfo), "");

  int freeContStack = 0;  //ESP.getFreeContStack();
  int freeHeap = 0;       //ESP.getFreeHeap();
  message = F("Setpoint: ");
  message += String(temperatureSetpoint, 1);
  message += F("°C, Current Temp: ");
  message += String(sensors.getTempCByIndex(0), 1);
  message += F("°C\n     Stack: ");
  message += String(freeContStack);
  message += F(" bytes, Heap: ");
  message += String(freeHeap);
  message += F(" bytes");

  bot.sendMessage(CHAT_ID, message.c_str(), "");


  // Print the last reset reason
  printResetReason();



  Serial.println(F("server begin"));

  buzzer();

  server.begin();
}



void buzzer() {

  tone(BUZZER_PIN, 1000, 250);  // Play the first tone (1000 Hz for 250 milliseconds)
  delay(250 + 10);              // Wait for the 250 of the first tone plus a little extra to ensure it's fully played

  tone(BUZZER_PIN, 2000, 250);  // Play the second tone (2000 Hz for 250 milliseconds)
  delay(250 + 10);              // Wait for the 250 of the second tone plus a little extra
}



// Scan local network for other ESP mDNS devices
void browseService(const char *service, const char *proto) {
  Serial.println("");
  //Serial.printf("Scan _%s._%s.local. ... ", service, proto);
  Serial.printf("Scan mDNS... ");             //_%s._%s.local. ... ", service, proto);
  int n = MDNS.queryService(service, proto);  // Query mDNS service
  if (n == 0) {
    Serial.print(F("\033[31m"));  //red
    Serial.println(F("\nDamn, no services found\n Flash more Devices\n  And give each a Unique mDNS name in Setup tab Custom"));
    Serial.print(F("\033[0m"));  // Reset color

    // Now send 'telegramMessage' via your Telegram bot
    bot.sendMessage(CHAT_ID, F("Damn, no other ESP mDNS devices found\n Flash more ESP Devices\nhttps://ldijkman.github.io/async-esp-fs-webserver/"), "");
  } else {
    Serial.print(n);
    Serial.println(F(" service(s) found"));
    /*
        // Create a JSON array to hold service details
        DynamicJsonDocument doc(1024);
        JsonArray services = doc.to<JsonArray>();
    */
    String telegramMessage = "";
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
      Serial.print("\033[32m");  // Set green color (other color codes available)
      Serial.printf("   %d: http://%s - http://%s\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str());
      Serial.print("\033[0m");  // Reset color

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
    telegramMessage = "";
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

  String message = "";  //F("Scan Done    Stack: ") + String(ESP.getFreeContStack()) + F(" bytes, Heap: ") + String(ESP.getFreeHeap()) + F(" bytes");
  bot.sendMessage(CHAT_ID, message, "");
  message = "";
  Serial.println();
}






void handleNewMessages(int numNewMessages) {


  for (int i = 0; i < numNewMessages; i++) {
    Serial.println("\n");
    Serial.print(F("bot.messages[i].text "));
    Serial.println(bot.messages[i].text);

    ///*
    if (bot.messages[i].web_app_data != "") {
      if (bot.messages[i].web_app_data != "") {
        // Process the web_app_data
        Serial.println(F("XXXXXXXXXXXXXXXXXXXXX Web App Data: "));



        // Parse the JSON data
        DynamicJsonDocument doc(1024);  // Adjust the size according to your needs
                                        //deserializeJson(doc, bot.messages[i].web_app_data);
        DeserializationError error = deserializeJson(doc, bot.messages[i].web_app_data);

        if (error) {
          Serial.print(F("deserializeJson() failed: "));
          Serial.println(error.c_str());
          return;  // Stop execution if parsing fails
        }
        JsonArray arr = doc.as<JsonArray>();
        /*
 * 
 * if json string is not correct next brings wdt reset boot loop
 * moved sort to html javascript schedule html just before web app send data
 * 
    // Simple Bubble Sort for "on" times
    bool swapped;
    do {
      swapped = false;
      for (int j = 0; j < arr.size() - 1; j++) {
        if (arr[j]["on"] > arr[j + 1]["on"]) {
          // Swap
          JsonObject temp = arr.createNestedObject();
          temp.set(arr[j]);
          
          arr[j].set(arr[j + 1]);
          arr[j + 1].set(temp);

          // Remove temporary object at the end
          arr.remove(arr.size() - 1);

          swapped = true;
        }
      }
    } while (swapped);
*/
        // Initialize a String to build the message
        String message = "Schedule:\n";

        // Process and build message from sorted JSON array
        for (JsonVariant v : arr) {
          int onTime = v["on"];
          int offTime = v["off"];

          // Convert minutes into hours and minutes format
          String onHours = String(onTime / 60);
          String onMinutes = String(onTime % 60);
          if (onMinutes.length() < 2) onMinutes = "0" + onMinutes;  // Add leading zero if needed

          String offHours = String(offTime / 60);
          String offMinutes = String(offTime % 60);
          if (offMinutes.length() < 2) offMinutes = "0" + offMinutes;  // Add leading zero if needed

          // Append the current on/off pair to the message
          message += "On: " + onHours + ":" + onMinutes + ", Off: " + offHours + ":" + offMinutes + "\n";

          Serial.print(F("On Time: "));
          Serial.print(onHours + ":" + onMinutes);
          Serial.print(F(", Off Time: "));
          Serial.println(offHours + ":" + offMinutes);
        }

        // Send messages back to the chat
        String chat_id = bot.messages[i].chat_id;
        bot.sendMessage(chat_id, bot.messages[i].web_app_data, "");       // json
        bot.sendMessage(chat_id, "Received data from the web app!", "");  // Confirmation message
        bot.sendMessage(chat_id, message, "");                            // Send the organized schedule message
        Serial.println(F("XXXXXXXXXXXXXXXXXXXXX Data processed."));
      }
    }
    // */



    // If the type is a "callback_query", a inline keyboard button was pressed
    if (bot.messages[i].type == F("callback_query")) {
      String text = bot.messages[i].text;

      // Extract callback_query_id from the callback query
      String callbackQueryId = bot.messages[i].query_id;








      // Optionally, extract the message text sent with the callback query
      // Note: This is the data associated with the button that was pressed, not a text message from the user
      //String callbackData = bot.messages[i].query_data;
      // 'struct telegramMessage' has no member named 'query_data'; did you mean 'query_id'?
      String callbackData = bot.messages[i].text;

      Serial.print(F("Callback Query ID: "));
      Serial.println(callbackQueryId);

      Serial.print(F("Callback Query Data: "));
      Serial.println(callbackData);


      // Here you can process the callback query
      // For example, answer the callback query to stop the loading spinner on the button
      String notificationText = F("Button pressed!");  // Notification text to send to user (optional)
      //bool showAlert = true; // Choose whether to show an alert box or a toast notification
      bool showAlert = false;  // Choose whether to show an alert box or a toast notification
                               // this stops the inline keyboard button click spinner animation
      bot.answerCallbackQuery(callbackQueryId, notificationText, showAlert);





      Serial.print(F("Call back button pressed with text: "));
      Serial.println(text);
      // ws.textAll(F("Telegram button Recieved ") + text);
      if (text.startsWith("/schedule ")) {
        // Extract time and duration from the command
        text.remove(0, 10);  // Remove the command part
        int splitIndex = text.indexOf(' ');
        String time = text.substring(0, splitIndex);
        String duration = text.substring(splitIndex + 1);

        // Here you can handle the scheduling logic based on extracted 'time' and 'duration'
        // For demonstration, just echo back the scheduled time and duration
        String reply = "Task scheduled at " + time + " for " + duration + " minutes.";
        bot.sendMessage(CHAT_ID, reply, "");
      }

      if (text == F("ON")) {
        manual = 1;
        digitalWrite(LED_PIN, LOW);
        bot.sendMessage(CHAT_ID, F("LED ON"), "");
      } else if (text == F("OFF")) {
        digitalWrite(LED_PIN, HIGH);
        manual = 0;
        bot.sendMessage(CHAT_ID, F("LED OFF"), "");
      } else if (text.startsWith("TIME")) {
        manual = 1;
        text.replace("TIME", "");
        timeRequested = text.toInt();
        digitalWrite(LED_PIN, LOW);
        String message = F("LED ON, off delay ");
        message += String(timeRequested);
        message += F(" Minutes");
        bot.sendMessage(CHAT_ID, message, "");
        lightTimerActive = true;
        lightTimerExpires = millis() + (timeRequested * 1000 * 60);
      } else if (text.startsWith("TEMP")) {
        text.replace("TEMP", "");
        temperatureSetpoint = text.toInt();

        String message = F("Setpoint: ");
        message += String(temperatureSetpoint, 1);
        message += F("°C, Current Temp: ");
        message += String(sensors.getTempCByIndex(0), 1);
        message += F("°C\n     Stack: ");
        // message += String(ESP.getFreeContStack());
        message += F(" bytes, Heap: ");
        // message += String(ESP.getFreeHeap());
        message += F(" bytes");
        bot.sendMessage(CHAT_ID, message.c_str(), "");
      }


      if (text == F("/scan")) {
        bot.sendMessage(CHAT_ID, F("Scan local network for other ESP mDNS device"), "");
        browseService("http", "tcp");  // find other mdns devices in network
      }

      if (text == F("/buzzer")) {
        bot.sendMessage(CHAT_ID, F("Buzzer Test"), "");
        buzzer();
      }

      if (text == F("reboot")) {
        // /* keeps rebooting
        if (millis() > 30000) {  // Check if 30 seconds have passed otherwise do not reboot
          // old messages keeps it rebooting

          bot.sendMessage(CHAT_ID, F("Rebooting now...\n   Please Wait for a new Menu"), "");
          delay(1000);              // Short delay to ensure message delivery
          RestartTriggered = true;  // flag used in loop to restart ESP

        } else {
          bot.sendMessage(CHAT_ID, F("Reboot blocked for 30sec after boot"), "");
        }
        //*/
      }





    } else {




      String chat_id = String(bot.messages[i].chat_id);
      String text = bot.messages[i].text;
      text.toLowerCase();


      if (text == F("/options") || text == F("/menu") || text == F("menu")) {

        // static persistent menu at bottom ?

        // String bottomkeyboardJson = "[[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]]";
        // Define the JSON keyboard layout as a constant character array in program memory
        // const char bottomkeyboardJson[] PROGMEM = R"JSON([[\"Menu\", \"On\",\"OFF\",\"Buzzer\"],[\"Reboot\"]])JSON";
        // bot.sendMessageWithReplyKeyboard(CHAT_ID, "Create Static Menu", "", bottomkeyboardJson, true);

        bool resizeKeyboard = true;
        bool oneTimeKeyboard = false;
        bool forceReply = false;

        bot.sendMessageWithReplyKeyboard(CHAT_ID, "Create Static Menu", "", bottomkeyboardJson, resizeKeyboard, oneTimeKeyboard, forceReply);
        Serial.println(F("send bottom bot menu "));


        // Keyboard Json is an array of arrays.
        // The size of the main array is how many row options the keyboard has
        // The size of the sub arrays is how many coloums that row has

        // "The Text" property is what shows up in the keyboard
        // The "callback_data" property is the text that gets sent when pressed
        String message = "Thermostat \n";
        message += "WiFi Network: " + String(ssid) + "\n";
        message += "Local URL: http://" + String(mDNS_adress) + ".local\n";
        message += "Local IP: http://" + WiFi.localIP().toString() + "\n";
        message += "External IP: " + externalIP + "\nReset reason " + resetReasonStr + "\n";

        bot.sendMessage(chat_id, message.c_str(), "");


        bot.sendMessageWithInlineKeyboard(chat_id, F("Thermostat Control\nhttps://t.me/s/Luberth_Dijkman"), "", keyboardJson);

        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C";  // 1 decimal place for float
        bot.sendMessage(chat_id, message.c_str(), "");
      }

      // When a user first uses a bot they will send a "/start" command
      // So this is a good place to let the users know what commands are available
      if (text == F("/start")) {

        bot.sendMessage(chat_id, F("/options or /menu : returns the inline keyboard\n"), "Markdown");
      }

      if (text.startsWith("/set_")) {  // set temp from menu button sendarea
        text.replace("/set_", "");
        temperatureSetpoint = text.toInt();

        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        String message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C";  // 1 decimal place for float
        bot.sendMessage(chat_id, message.c_str(), "");
      }

      if (text == F("/reboot") || text == F("reboot")) {
        // /* keeps rebooting
        if (millis() > 30000) {  // Check if 30 seconds have passed otherwise do not reboot
          // old messages keeps it rebooting

          bot.sendMessage(CHAT_ID, "Rebooting now...\n   Please Wait for a new Menu", "");
          delay(1000);              // Short delay to ensure message delivery
          RestartTriggered = true;  // flag used in loop to restart ESP

        } else {
          bot.sendMessage(CHAT_ID, "Reboot blocked for 30sec after boot", "");
        }
        //*/
      }


      if (text == "/scan") {
        bot.sendMessage(chat_id, F("Scan local network for other ESP mDNS device"), "");
        browseService("http", "tcp");  // find other mdns devices in network
      }

      if (text == "/buzzer" || text == "buzzer") {
        bot.sendMessage(chat_id, F("Buzzer test D5"), "");
        buzzer();
      }


      if (text == F("on")) {
        manual = 1;
        digitalWrite(LED_PIN, LOW);
        bot.sendMessage(CHAT_ID, F("LED ON"), "");
      } else if (text == F("off")) {
        manual = 0;
        digitalWrite(LED_PIN, HIGH);
        bot.sendMessage(CHAT_ID, F("LED OFF"), "");
      }


      //used text tolower earlier so Min is min
      if (text == F("1min") || text == F("5min") || text == F("10min") || text == F("15min") || text == F("30min") || text == F("60min")) {
        manual = 1;
        text.replace("min", "");       // Remove the "Min" suffix to isolate the number
        timeRequested = text.toInt();  // Convert the remaining text to an integer
        digitalWrite(LED_PIN, LOW);

        String message = F("LED ON, off delay ");
        message += String(timeRequested);
        message += F(" Minutes");
        bot.sendMessage(CHAT_ID, message, "");

        lightTimerActive = true;
        lightTimerExpires = millis() + (timeRequested * 1000 * 60);
      }



      if (text == F("10°") || text == F("15°") || text == F("16°") || text == F("17°") || text == F("18°") || text == F("19°") || text == F("20°") || text == F("21°") || text == F("22°")) {

        text.replace("°", "");               // Replace the degree symbol with an empty string
        int tempSetpoint = text.toInt();     // Now convert the text to an integer
        temperatureSetpoint = tempSetpoint;  // Update the temperature setpoint

        // Construct the message to send back to the user
        String message = F("Setpoint: ");
        message += String(temperatureSetpoint, 1);
        message += F("°C, Current Temp: ");
        message += String(sensors.getTempCByIndex(0), 1);
        message += F("°C\n     Stack: ");
        //message += String(ESP.getFreeContStack());
        message += F(" bytes, Heap: ");
        //message += String(ESP.getFreeHeap());
        message += F(" bytes");
        bot.sendMessage(CHAT_ID, message.c_str(), "");
      }

      if (text == F("time")) {

        bot.sendMessage(CHAT_ID, asctime(timeinfo), "");
      }

      //used text tolower earlier so Min is min
      if (text == F("task")) {
        bot.sendMessage(CHAT_ID, F("Schedule 1 to 4 Daily Repeat\ntask tasknumber_1_to_4 HH:MM duration_in_minutes\nlike\ntask 1 06:30 30\n/list_tasks\n/delete_task"), "");
      }




      if (text.startsWith(F("task "))) {
        String taskDetails = text.substring(5);
        taskDetails.trim();

        int firstSpaceIndex = taskDetails.indexOf(" ");
        if (firstSpaceIndex != -1) {
          String taskNumberStr = taskDetails.substring(0, firstSpaceIndex);
          int taskNumber = taskNumberStr.toInt();

          if (taskNumber >= 1 && taskNumber <= 4) {
            String timeAndDuration = taskDetails.substring(firstSpaceIndex + 1);
            timeAndDuration.trim();

            int lastSpaceIndex = timeAndDuration.lastIndexOf(" ");
            if (lastSpaceIndex != -1) {
              String timePart = timeAndDuration.substring(0, lastSpaceIndex);
              String durationPart = timeAndDuration.substring(lastSpaceIndex + 1);

              if (timePart.length() == 5 && durationPart.toInt() > 0) {
                // Store task details in the corresponding array position
                tasks[taskNumber - 1].taskNumber = taskNumber;  // Task numbers start from 1, array indices from 0
                tasks[taskNumber - 1].time = timePart;
                tasks[taskNumber - 1].duration = durationPart.toInt();

                Serial.print(F("Task Number: "));
                Serial.println(taskNumber);
                Serial.print(F("Task Time: "));
                Serial.println(timePart);
                Serial.print(F("Task Duration: "));
                Serial.println(durationPart);

                writeTasksToEEPROM();

                //                        bot.sendMessage(CHAT_ID, F("Task #") + String(taskNumber) + F(" scheduled for ") + timePart + F(" with a duration of ") + durationPart + F(" minutes."), "");
              } else {
                bot.sendMessage(CHAT_ID, F("Invalid time or duration format. Please use 'task # HH:MM duration' format."), "");
              }
            } else {
              bot.sendMessage(CHAT_ID, F("Invalid format. Please use 'task # HH:MM duration' format."), "");
            }
          } else {
            bot.sendMessage(CHAT_ID, F("Invalid task number. Please use a number from 1 to 4."), "");
          }
        } else {
          bot.sendMessage(CHAT_ID, F("Invalid task format. Please use 'task # HH:MM duration' format."), "");
        }
      }



      // Inside your message handling loop

      if (text.startsWith(F("/delete_task"))) {
        int taskNumber = text.substring(12).toInt();  // Extract task number from command
        if (taskNumber > 0) {
          deleteTask(taskNumber);
          //     bot.sendMessage(CHAT_ID, F("Task #") + String(taskNumber) + F(" deleted."), "");
        } else {
          bot.sendMessage(CHAT_ID, F("Invalid task number.\n/delete_task1\n/delete_task2\n/delete_task3\n/delete_task4\n/list_tasks"), "");
        }
      }






      if (text == F("/list_tasks")) {
        String message = F("Scheduled Tasks:\n");
        bool hasTasks = false;

        for (int j = 0; j < maxTasks; j++) {
          if (tasks[j].taskNumber > 0) {  // Assuming taskNumber > 0 as indicator of a used slot
            hasTasks = true;
            //                message += F("Task #") + String(tasks[j].taskNumber) + F(": ");
            //                message += F("Time: ") + tasks[j].time + F(", ");
            //                message += F("Duration: ") + String(tasks[j].duration) + F(" minutes\n");
          }
        }

        if (!hasTasks) {
          message += F("No tasks scheduled.");
        }

        // bot.sendMessage(CHAT_ID, message, "");
      }

      //used text tolower earlier so Min is min
      if (text == F("info")) {






        uint32_t chipId = 0;             //ESP.getChipId();
        uint32_t flashChipId = 0;        //ESP.getFlashChipId();
        uint32_t flashChipSize = 0;      //ESP.getFlashChipSize();
        uint32_t flashChipRealSize = 0;  //ESP.getFlashChipRealSize();
        uint32_t freeSketchSpace = 0;    //ESP.getFreeSketchSpace();
        uint32_t sketchSize = 0;         //ESP.getSketchSize();
        uint8_t cpuFreqMHz = 0;          //ESP.getCpuFreqMHz();
        String sdkVersion = "";          //ESP.getSdkVersion();
        uint8_t bootVersion = 0;         //ESP.getBootVersion();

        // Network Information
        String ipAddress = WiFi.localIP().toString();
        String macAddress = WiFi.macAddress();
        String ssid = WiFi.SSID();
        int32_t rssi = WiFi.RSSI();

        /*
 FSInfo fs_info;
  if (FS.info(fs_info)) {
    uint32_t totalBytes = fs_info.totalBytes;
    uint32_t usedBytes = fs_info.usedBytes;
    uint32_t freeBytes = totalBytes - usedBytes;

    String message = "";
    message += "LittleFS Information:\n";
    message += "Total Bytes: " + String(totalBytes) + "\n";
    message += "Used Bytes: " + String(usedBytes) + "\n";
    message += "Free Bytes: " + String(freeBytes) + "\n";

    Serial.println(message);
  } else {
    Serial.println("Failed to retrieve LittleFS Information.");
  }
  */
        // mDNS Information
        String mdnsInfo = F("http://");
        mdnsInfo += String(mDNS_adress);
        mdnsInfo += F(".local");

        // Router IP Address
        IPAddress gatewayIP = WiFi.gatewayIP();
        String routerIP = gatewayIP.toString();



        String message = F("http://paypal.me/LDijkman\n\n");

        // Check for PSRAM availability and add its information to the message
        if (psramFound()) {
          message += F("PSRAM is found.\n");
          message += F("PSRAM size: ");
          message += String(ESP.getPsramSize());
          message += F(" bytes\n");
        } else {
          message += F("PSRAM is not available.\n");
        }

        float temperature = temperatureRead();
        message += F("ESP Internal Temperature: ");
        message += String(temperature);
        message += F(" °C\n");

        message += "free heap: " + String(esp_get_free_heap_size()) + "\n";
        heap_caps_print_heap_info(MALLOC_CAP_DEFAULT);

        multi_heap_info_t info;
        heap_caps_get_info(&info, MALLOC_CAP_INTERNAL);
        message += F("Internal Heap Size: ");
        message += String(info.total_free_bytes + info.total_allocated_bytes);
        message += F(" bytes\n");

        message += F("Internal Free Heap: ");
        message += String(info.total_free_bytes);
        message += F(" bytes\n");

        // message += F("Chip ID: ") + String(chipId) + F("\n");
        // message += F("Flash Chip ID: ") + String(flashChipId) + F("\n");
        // message += F("Flash Chip Size: ") + String(flashChipSize) + F(" bytes\n");
        // message += F("Flash Chip Real Size: ") + String(flashChipRealSize) + F(" bytes\n");
        // message += F("Free Sketch Space: ") + String(freeSketchSpace) + F(" bytes\n");
        // message += F("Sketch Size: ") + String(sketchSize) + F(" bytes\n");
        // message += F("CPU Frequency: ") + String(cpuFreqMHz) + F(" MHz\n");
        // message += F("SDK Version: ") + sdkVersion + F("\n");
        //  message += F("Boot Version: ") + String(bootVersion) + F("\n\n");




        // Chip ID (MAC address in this case as a stand-in for a unique chip identifier)
        uint8_t baseMac[6];
        esp_read_mac(baseMac, ESP_MAC_WIFI_STA);
        char baseMacChr[18] = { 0 };
        sprintf(baseMacChr, "%02X:%02X:%02X:%02X:%02X:%02X", baseMac[0], baseMac[1], baseMac[2], baseMac[3], baseMac[4], baseMac[5]);
        message += F("Chip ID: ");
        message += String(baseMacChr) + F("\n");

        // Flash Chip Size
        flashChipSize = ESP.getFlashChipSize();
        message += F("Flash Chip Size: ");
        message += String(flashChipSize);
        message += F(" bytes\n");

        // Flash Chip Real Size
        flashChipRealSize = ESP.getFlashChipSize();
        message += F("Flash Chip Real Size: ");
        message += String(flashChipRealSize);
        message += F(" bytes\n");

        // Free Sketch Space
        freeSketchSpace = ESP.getFreeSketchSpace();
        message += F("Free Sketch Space: ");
        message += String(freeSketchSpace);
        message += F(" bytes\n");

        // Sketch Size
        sketchSize = ESP.getSketchSize();
        message += F("Sketch Size: ");
        message += String(sketchSize);
        message += F(" bytes\n");

        // CPU Frequency
        cpuFreqMHz = ESP.getCpuFreqMHz();
        message += F("CPU Frequency: ");
        message += String(cpuFreqMHz);
        message += F(" MHz\n");

        // SDK Version
        sdkVersion = esp_get_idf_version();
        message += F("SDK Version: ");
        message += String(sdkVersion);
        message += F("\n");

        message += F("Wi-Fi Mode: ");
        switch (WiFi.getMode()) {
          case WIFI_OFF: message += F("OFF"); break;
          case WIFI_STA: message += F("STA"); break;
          case WIFI_AP: message += F("AP"); break;
          case WIFI_AP_STA: message += F("AP+STA"); break;
          default: message += F("UNKNOWN"); break;
        }
        message += F("\n");

        message += F("Wi-Fi Channel: ");
        message += String(WiFi.channel());
        message += F("\n");


        message += F("IP Address: http://");
        message += ipAddress;
        message += F("\n");

        message += F("MAC Address: ");
        message += macAddress;
        message += ("\n");

        message += F("mDNS: ");
        message += mdnsInfo;
        message += F("\n");

        message += F("SSID: ");
        message += ssid;
        message += F("\n");

        message += F("RSSI: ");
        message += String(rssi);
        message += F(" dBm\n");

        message += F("External IP: http://");
        message += externalIP;
        message += F("\n");

        message += F("Router IP: http://");
        message += routerIP;
        message += F("\n");

        message += F("Gateway IP: http://");             // Directly appending a string literal
        message += String(WiFi.gatewayIP().toString());  // Appending the IP address as a String
        message += F("\n");                              // Appending a newline character

        message += F("DNS Server 1: ");
        message += WiFi.dnsIP(0).toString();
        message += F("\n");

        message += F("DNS Server 2: ");
        message += WiFi.dnsIP(1).toString();
        message += F("\n\n");


        // message += F("LittleFS Total Bytes: ") + String(totalBytes) + F("\n");
        // message += F("LittleFS Used Bytes: ") + String(usedBytes) + F("\n");
        // message += F("LittleFS Free Bytes: ") + String(freeBytes) + F("\n\n");

        message += F("a Penny for Sharing my Thoughts?!");
        bot.sendMessage(CHAT_ID, message);
        bot.sendMessage(CHAT_ID, F("/list_tasks"));
        browseService("http", "tcp");  // find other mdns devices in network

        bot.sendMessage(CHAT_ID, F("https://t.me/Arduino_ESP8266_ESP32"));

        bot.sendMessage(CHAT_ID, F("https://t.me/Luberth_Dijkman"));
      }
    }
  }
}







void checkAndActivateTasks() {
  bool isAnyTaskActive = false;  // Flag to track if any task is currently active

  time_t now = time(nullptr);
  struct tm *timeinfo = localtime(&now);
  unsigned long currentTime = timeinfo->tm_hour * 60 + timeinfo->tm_min;  // Convert current time to minutes from midnight

  for (int i = 0; i < 4; i++) {      // Correct loop condition to iterate correctly through tasks
    if (tasks[i].taskNumber != 0) {  // Skip empty tasks
      int taskHour = tasks[i].time.substring(0, 2).toInt();
      int taskMinute = tasks[i].time.substring(3, 5).toInt();
      int duration = tasks[i].duration;

      // Calculate the task's start and end time
      unsigned long taskStartTime = taskHour * 60 + taskMinute;
      unsigned long taskEndTime = taskStartTime + duration;

      // Check if current time is within the task's active period
      if (currentTime >= taskStartTime && currentTime < taskEndTime) {
        isAnyTaskActive = true;  // Mark that at least one task is active
        break;                   // Exit the loop as we found an active task
      }
    }
  }
  bool currentLedState = isAnyTaskActive ? LOW : HIGH;
  if (manual == 0) {  // manual on switch or off delay time on  override tasks
    // Set the LED (or relay) state based on whether any task is active
    if (isAnyTaskActive) {
      digitalWrite(LED_PIN, LOW);  // Activate relay
    } else {
      digitalWrite(LED_PIN, HIGH);  // Deactivate relay
    }
  }
  // Send a message through the bot indicating the state change
  //    if (currentLedState == LOW) {
  //        bot.sendMessage(CHAT_ID, F("LED_PIN LOW: Task Active"), "");
  //   } else {
  //       bot.sendMessage(CHAT_ID, F("LED_PIN HIGH: No Active Task"), "");
  //   }
}


int delayBetweenChecks = 1000;
unsigned long lastTimeChecked;  //last time messages' scan has been done
static unsigned long lastMillis = 0;


void loop() {

  sensors.requestTemperatures();
  float temperature = sensors.getTempCByIndex(0);
  if (temperature < 10 || temperature > 40) {
    buzzer();
  }





  if (millis() > lastTimeChecked + delayBetweenChecks) {
    // checks all scheduled tasks against the current time and activates a relay if the current time is within a task's active period
    checkAndActivateTasks();

    ws.cleanupClients();

    // getUpdates returns 1 if there is a new message from Telegram
    int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    // Serial.println(bot.getUpdates(bot.last_message_received));
    // Serial.println(bot.getUpdates(bot.last_sent_message_id));
    // Serial.println(F("numNewMessages ") + String(numNewMessages));




    if (numNewMessages) {
      Serial.println(F("got response"));
      handleNewMessages(numNewMessages);
    }

    lastTimeChecked = millis();

    if (lightTimerActive && millis() > lightTimerExpires) {
      manual = 0;
      lightTimerActive = false;
      digitalWrite(LED_PIN, HIGH);
      // Create a string to hold the message, including the time in seconds
      String message = F("LED OFF delay Time Expired. \nTime was set for: ");
      message += String(timeRequested);  // Add the time  to the message
      message += F(" Minutes.");

      // Send the message
      bot.sendMessage(CHAT_ID, message, "");
    }
  }



  if (RestartTriggered == true) {
    buzzer();
    ESP.restart();
  }



  if (millis() - lastMillis > 5000) {  // delay without Delay(), do it every 5 seconds
    lastMillis = millis();             //

    // Get free stack and heap memory
    freeStack = 0;  //ESP.getFreeContStack();
    freeHeap = 0;   //ESP.getFreeHeap();

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
    Serial.print(F("IP Address: "));
    Serial.println(WiFi.localIP());
    Serial.print(F("mDNS Address: "));
    Serial.print(F("http://"));
    Serial.print(mDNS_adress);
    Serial.println(F(".local"));
    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
    //   String ip = F("IP: http://") + WiFi.localIP().toString();
    //   ws.textAll(ip.c_str());                          // Send the string to all connected WebSocket clients.
    // Create a string containing both the local IP address and the mDNS URL, separated by a comma for clarity.
    //    String mDNS = F("mDNS: http://") + String(mDNS_adress) + F(".local"); // Corrected to use 'mDNS_adress'
    //   ws.textAll(mDNS.c_str());                        // Send the string to all connected WebSocket clients.

    Serial.print(F("Current temperature: "));
    Serial.print(tempString);
    Serial.println(" °C");
    Serial.print(F("Current setpoint: "));
    Serial.print(temperatureSetpoint);
    Serial.println(" °C\n");


    // Implement hysteresis control
    if (!relayState && temperature < (temperatureSetpoint - hysteresisMargin)) {
      digitalWrite(relayPin, HIGH);  // Activate the relay if temperature goes below the lower threshold
      relayState = true;             // Update relay state
    } else if (relayState && temperature > (temperatureSetpoint + hysteresisMargin)) {
      digitalWrite(relayPin, LOW);  // Deactivate the relay if temperature goes above the upper threshold
      relayState = false;           // Update relay state
    }


    // No change if the temperature is within the hysteresis band

    // Send the temperature to all connected clients
    String message = "";  //F("temperature:") + tempString;
    ws.textAll(message.c_str());
    // Inside your loop(), replace the relay state message construction and sending part with:
    //   String relayStateMessage = F("relays:") + String(relayState ? "1" : "0"); // Converts boolean to "1" or "0"
    // String relayStateMessage = "relays:" + String(relayState ? "ON" : "OFF"); // Converts boolean to "1" or "0"
    //   ws.textAll(relayStateMessage.c_str());
    // Construct the setpoint message
    //    String setpointMessage = F("setpoint:") + String(temperatureSetpoint);
    //   ws.textAll(setpointMessage.c_str());
  }
  // MDNS.update(); // Keep the mDNS responder updated
  // only needed for ESP8266 Version
}
