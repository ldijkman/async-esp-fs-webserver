
// should be possible to set setpoint from telegram buttons 15 and 20 celsius
//    https://youtu.be/n8N7pnrjb2A

// https://t.me/s/Luberth_Dijkman
// video https://t.me/Luberth_Dijkman/15

// added bottom menu scan mdns for other ESP devices in telegram

// added Telegram fault notification message to phone
// telegram app for adroid phone 
//      https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=nl&gl=US
// Telegram for PC Desktop
//      https://desktop.telegram.org/
// configure telegram 


// playing with buttons in Telegram Message
//       https://youtu.be/-IC-Z78aTOs
//       https://github.com/witnessmenow/Simple-Home-Automation-With-Telegram/blob/master/LedControl/LedControl.ino

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



// changed relaispin
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




// Replace with your network WiFi Router credentials
const char* ssid = "Bangert_30_Andijk";      // wifi router name broadcasted in the air
const char* password = "ookikwilerin";       // your password

const char* mDNS_adress = "thermostat";  // .local is added by ESP

String externalIP = ""; // Global variable to store the external IP address

unsigned long lightTimerExpires;
boolean lightTimerActive = false;


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




void getExternalIP() {
  WiFiClient client; // Create a WiFiClient object
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;  //Declare an object of class HTTPClient

    http.begin(client, "http://api.ipify.org");  //Specify request destination with WiFiClient
    int httpCode = http.GET();  //Send the request

    if (httpCode > 0) { //Check the returning code
      externalIP = http.getString();   //Update the global variable with the external IP
       Serial.print("externalIP ");
       Serial.println(externalIP);
    } else {
      Serial.printf("Failed to retrieve IP, error: %s\n", http.errorToString(httpCode).c_str());
      Serial.println("Failed to retrieve IP");
    }

    http.end();   //Close connection
  } else {
    Serial.println("Error in WiFi connection");
  }
}



void setup() {
  Serial.begin(115200);


  pinMode(relayPin, OUTPUT); // Initialize the relay pin as an output
  digitalWrite(relayPin, LOW); // Start with the relay off



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
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  getExternalIP();


  // Start the DS18B20 sensor
  sensors.begin();

  // Initialize mDNS
  if (!MDNS.begin(mDNS_adress)) { // Start the mDNS responder for http://thermostat.local
    Serial.println("Error setting up MDNS responder!");
  } else {
    Serial.println("mDNS responder started");
    // Print the mDNS address
    Serial.print("mDNS Address: ");
    Serial.print("http://");
    Serial.print(mDNS_adress);
     Serial.println(".local");

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

//////////////////////////////////////////////////////////////
// looks like next is needed for Telegram notifications
  Serial.print("Retrieving time: ");
  configTime(0, 0, "pool.ntp.org", "time.nist.gov"); // Improved NTP server configuration
  time_t now = time(nullptr);
  while (now < 24 * 3600) {
    Serial.print(".");
    delay(1000);
    now = time(nullptr);
  }

  // Convert the time to a struct tm
  struct tm *timeinfo;
  timeinfo = gmtime(&now);

  // Alternatively, for local time adjusted to your timezone, you might use localtime(&now) instead of gmtime(&now)

  // Print the time in human-readable format
  Serial.println();
  Serial.print("Current time: ");
  Serial.print(asctime(timeinfo)); // asctime() converts the time to a string in the format: Day Mon Date Hours:Minutes:Seconds Year\n

  // For more control over formatting, use strftime() instead:
  char buffer[80];
  strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", timeinfo);
  Serial.print("Formatted time: ");
  Serial.println(buffer);
//////////////////////////////////////////////////////////////

Serial.println("send bot bottom menu button");
// Menu button in send area
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
  
// Menu button in send area


Serial.println("send bot start info");
String message = "Thermostat started \n";
message += "WiFi Network: " + String(ssid)+ "\n";
message += "Local URL: http://" + String(mDNS_adress) + ".local\n";
message += "Local IP: " + WiFi.localIP().toString() + "\n";
message += "External IP: " + externalIP + "\n";
bot.sendMessage(CHAT_ID, message.c_str(), "");

Serial.println("send bot menu");
        String keyboardJson = F("[[{ \"text\" : \"ON\", \"callback_data\" : \"ON\" },{ \"text\" : \"OFF\", \"callback_data\" : \"OFF\" }],");
        keyboardJson += F("[{ \"text\" : \"10 Mins\", \"callback_data\" : \"TIME10\" }, { \"text\" : \"20 Mins\", \"callback_data\" : \"TIME20\" }, { \"text\" : \"30 Mins\", \"callback_data\" : \"TIME30\" }],");
        keyboardJson += F("[{ \"text\" : \"15 °C\", \"callback_data\" : \"TEMP15\" }, { \"text\" : \"18 °C\", \"callback_data\" : \"TEMP18\" },{ \"text\" : \"20 °C\", \"callback_data\" : \"TEMP20\" },{ \"text\" : \"21 °C\", \"callback_data\" : \"TEMP21\" }]]");
        bot.sendMessageWithInlineKeyboard(CHAT_ID, "Thermostat Control\nhttps://t.me/s/Luberth_Dijkman", "", keyboardJson);
 
 Serial.println("send bot temp info");
// Assuming temperatureSetpoint is a float
// Assuming currentTemperature holds the current temperature
message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
bot.sendMessage(CHAT_ID, message.c_str(), "");

Serial.println("server begin");
  
  server.begin();

}



void browseService(const char* service, const char* proto) {
  Serial.println("");
  //Serial.printf("Scan _%s._%s.local. ... ", service, proto);
  Serial.printf("Scan mDNS... ");//_%s._%s.local. ... ", service, proto);
  int n = MDNS.queryService(service, proto);  // Query mDNS service
  if (n == 0) {
    Serial.print("\033[31m"); //red
    Serial.println("\nDamn, no services found\n Flash more Devices\n  And give each a Unique mDNS name in Setup tab Custom");
    Serial.print("\033[0m"); // Reset color
  } else {
    Serial.print(n);
    Serial.println(" service(s) found");

    // Create a JSON array to hold service details
    DynamicJsonDocument doc(1024);
    JsonArray services = doc.to<JsonArray>();

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
    String telegramMessage;
    telegramMessage += String(i + 1) + ": http://" + hostnameLower + ".local - http://" + MDNS.IP(i).toString() + "\n";
    
    // Now send 'telegramMessage' via your Telegram bot
    // Make sure to replace 'CHAT_ID' with your actual chat ID and 'bot' with your bot instance
    bot.sendMessage(CHAT_ID, telegramMessage, "");
   

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
  }
  Serial.println();
}




void handleNewMessages(int numNewMessages) {

  for (int i = 0; i < numNewMessages; i++) {
      Serial.print("bot.messages[i].text ");
      Serial.println(bot.messages[i].text);

    // If the type is a "callback_query", a inline keyboard button was pressed
    if (bot.messages[i].type ==  F("callback_query")) {
      String text = bot.messages[i].text;

      
      Serial.print("Call back button pressed with text: ");
      Serial.println(text);
       ws.textAll("Telegram button Recieved " + text); 


      if (text == F("ON")) {
       // digitalWrite(LED_PIN, HIGH);
      } else if (text == F("OFF")) {
        //digitalWrite(LED_PIN, LOW);
      } else if (text.startsWith("TIME")) {
        text.replace("TIME", "");
        int timeRequested = text.toInt();
        
        
       // digitalWrite(LED_PIN, HIGH);
        lightTimerActive = true;
        lightTimerExpires = millis() + (timeRequested * 1000 * 60);
      }else if (text.startsWith("TEMP")) {
        text.replace("TEMP", "");
        temperatureSetpoint = text.toInt();
        
        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        String message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
        bot.sendMessage(CHAT_ID, message.c_str(), "");
        
       // digitalWrite(LED_PIN, HIGH);
        //lightTimerActive = true;
       // lightTimerExpires = millis() + (timeRequested * 1000 * 60);
      }


     
    } else {
      String chat_id = String(bot.messages[i].chat_id);
      String text = bot.messages[i].text;

      if (text == F("/options")) {

        // Keyboard Json is an array of arrays.
        // The size of the main array is how many row options the keyboard has
        // The size of the sub arrays is how many coloums that row has

        // "The Text" property is what shows up in the keyboard
        // The "callback_data" property is the text that gets sent when pressed  
        String message = "Thermostat \n";
        message += "WiFi Network: " + String(ssid)+ "\n";
        message += "Local URL: http://" + String(mDNS_adress) + ".local\n";
        message += "Local IP: " + WiFi.localIP().toString() + "\n";
        message += "External IP: " + externalIP + "\n";
        
        bot.sendMessage(CHAT_ID, message.c_str(), "");
        String keyboardJson = F("[[{ \"text\" : \"ON\", \"callback_data\" : \"ON\" },{ \"text\" : \"OFF\", \"callback_data\" : \"OFF\" }],");
        keyboardJson += F("[{ \"text\" : \"10 Mins\", \"callback_data\" : \"TIME10\" }, { \"text\" : \"20 Mins\", \"callback_data\" : \"TIME20\" }, { \"text\" : \"30 Mins\", \"callback_data\" : \"TIME30\" }],");
        keyboardJson += F("[{ \"text\" : \"15 °C\", \"callback_data\" : \"TEMP15\" }, { \"text\" : \"18 °C\", \"callback_data\" : \"TEMP18\" },{ \"text\" : \"20 °C\", \"callback_data\" : \"TEMP20\" },{ \"text\" : \"21 °C\", \"callback_data\" : \"TEMP21\" }]]");
        bot.sendMessageWithInlineKeyboard(CHAT_ID, "Thermostat Control\nhttps://t.me/s/Luberth_Dijkman", "", keyboardJson);
 
        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
        bot.sendMessage(CHAT_ID, message.c_str(), "");
      
      }

      // When a user first uses a bot they will send a "/start" command
      // So this is a good place to let the users know what commands are available
      if (text == F("/start")) {

        bot.sendMessage(chat_id, "/options : returns the inline keyboard\n", "Markdown");
      }

      if (text.startsWith("/set_")) {  // set temp from menu button sendarea
        text.replace("/set_", "");
        temperatureSetpoint = text.toInt();
        
        // Assuming temperatureSetpoint is a float
        // Assuming currentTemperature holds the current temperature
        String message = "Setpoint: " + String(temperatureSetpoint, 1) + "°C, Current Temp: " + String(sensors.getTempCByIndex(0), 1) + "°C"; // 1 decimal place for float
        bot.sendMessage(CHAT_ID, message.c_str(), "");
      }
/* keeps rebooting 
      if (text == "/reboot") {
        bot.sendMessage(chat_id, "Rebooting now...", "");
        delay(1000); // Short delay to ensure message delivery
        ESP.restart(); // Command to restart the ESP8266
      }
*/      

      if (text == "/scan") {
        bot.sendMessage(chat_id, "Scan local network for other ESP mDNS device", "");
        browseService("http", "tcp");  // find other mdns devices in network
      }




    }
  }
}











int delayBetweenChecks = 1000;
unsigned long lastTimeChecked;   //last time messages' scan has been done
static unsigned long lastMillis = 0;


void loop() {
  


  if (millis() > lastTimeChecked + delayBetweenChecks)  {

    // getUpdates returns 1 if there is a new message from Telegram
    int numNewMessages = bot.getUpdates(bot.last_message_received + 1);
    
    Serial.println("numNewMessages " + String(numNewMessages));

    if (numNewMessages) {
      Serial.println("got response");
      handleNewMessages(numNewMessages);
    }

    lastTimeChecked = millis();

   // if (lightTimerActive && millis() > lightTimerExpires) {
   //   lightTimerActive = false;
   //   digitalWrite(LED_PIN, LOW);
   // }
  }





  

  if (millis() - lastMillis > 5000) {  // delay without Delay(), do it every 5 seconds
    lastMillis = millis();
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
      String mDNS = "mDNS: http://" + String(mDNS_adress)+".local"; // Corrected to use 'mDNS_adress'
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
    // String relayStateMessage = "relays:" + String(relayState ? "ON" : "OFF"); // Converts boolean to "1" or "0"
    ws.textAll(relayStateMessage.c_str());
    // Construct the setpoint message
    String setpointMessage = "setpoint:" + String(temperatureSetpoint);
    ws.textAll(setpointMessage.c_str());


   

  }
  MDNS.update(); // Keep the mDNS responder updated
}
