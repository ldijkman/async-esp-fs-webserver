/*
WS2812 LED Strip FX Webserver flash from browser 
https://ldijkman.github.io/async-esp-fs-webserver/

http://ws2812.local/2812.html

  http://www.kitesurfer1404.de/tech/led-star
  https://github.com/kitesurfer1404/WS2812FX/tree/master


  Quick an dirty test of Improv wifi configuration

  <!--
  Copyright 2023 Dirk Luberth Dijkman Bangert 30 1619GJ Andijk The Netherlands
  The Art of Time Controlled. Visual TimeSlots Schedule.
  -->
*/

// does ESP8266 4mb 12E / 12F  maybe 12S


// mdns is working
// my android phone bonjourbrowser app lists it
//                       https://play.google.com/store/apps/details?id=de.wellenvogel.bonjourbrowser
//     ok now shows the correct set mdns adres http://garage.local
// choose a unique mdns adres for each ESP device like garden, living, toilet, hallway, stairs, kitchen, etcetera
// set mdns in /setup page tab custom



// need to make the on/off json websocket implemented
// chat gpt4 knows it all howto do it

// do not use delay() in the code, it will result in reboot loop

// when in wifi ap or apsta mode no date time displayed in serial monitor 115200
// only in wifi station mode  date time displayed  in serial monitor


// see when times are changed result in serial monitor 115200
// now need to do someting with the times on the ESP



#include <FS.h>
#include <LittleFS.h>
#include <AsyncFsWebServer.h>  // https://github.com/cotestatnt/async-esp-fs-webserver
// Arduino IDE => Sketch => include library => Manage Libraries ->
// search for "cotestatnt AsyncEspFSWebserver" and install

#include <ArduinoJson.h>
#include "time.h"
#if defined(ESP8266)
#include <ESP8266mDNS.h>
#include <ESP8266WiFi.h>
#endif

// Define the placeholder delimiter
//#define TEMPLATE_PLACEHOLDER '_'

#define LED_BUILTIN 2

#include <ESP8266WiFi.h>
#include <Esp.h>
#include <ImprovWiFiLibrary.h>  //https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/Improv_Wi-Fi/Improv-WiFi-Library-main

#include <WS2812FX.h>


// QUICKFIX...See https://github.com/esp8266/Arduino/issues/263
#define min(a,b) ((a)<(b)?(a):(b))
#define max(a,b) ((a)>(b)?(a):(b))

int LED_PIN =2;                       // 0 = GPIO0, 2=GPIO2=D4
int LED_COUNT =20;

unsigned long auto_last_change = 0;
unsigned long last_wifi_check_time = 0;
String modes = "";
uint8_t myModes[] = {}; // *** optionally create a custom list of effect/mode numbers
bool auto_cycle = false;
 uint32_t tmp;


WS2812FX ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
//WEB_SERVER server(HTTP_PORT);



//WiFiServer server(80);
ImprovWiFi improvSerial(&Serial);

char linebuf[80];
int charcount = 0;

int gpio_relais_pin = 2;         //wemos d1 esp32 led pin                 // for future relais gpio pin
int gpio_input_button_pin = 17;  // for future override
bool ledState = 0;

const char* hostname = "ws2812";  // .local is added by esp32 mdns   http://garage.local
String myhostname = hostname;

AsyncWebSocket ws("/ws");

AsyncFsWebServer server(80, LittleFS, "webserver");





// NTP server settings
const char* ntpServer = "time.google.com";
// can be set from setup custom
long GMT_Time_Offset_sec = 0;  // Adjust according to your timezoneGMT_Time_Offset_sec = 0;

const int daylightOffset_sec = 0;  // Typically 3600 for 1 hour, or 0 if not using DST





void onImprovWiFiErrorCb(ImprovTypes::Error err) {
  //server.stop();
  blink_led(2000, 3);
}

#include <string.h>          // For memset and memcpy
#include "user_interface.h"  // For station_config, wifi_station_get_config_default, etc.

void onImprovWiFiConnectedCb(const char* ssid, const char* password) {
  // Declare station configuration structure
  struct station_config stationConf;

  // Get the current configuration (if needed to keep some settings)
  wifi_station_get_config_default(&stationConf);

  // Clear previous configuration
  memset(&stationConf, 0, sizeof(stationConf));

  // Copy new SSID and password into station configuration
  // Note: ssid and password are assumed to be null-terminated strings
  // os_memcpy(destination, source, numBytes);
  os_memcpy(&stationConf.ssid, ssid, strlen(ssid));
  os_memcpy(&stationConf.password, password, strlen(password));

  // Set WiFi operation mode to station mode
  wifi_set_opmode(STATION_MODE);

  // Apply the new configuration
  wifi_station_set_config(&stationConf);

  // Assuming server.begin() and blink_led() are defined elsewhere correctly
  // server.begin(); // Start server (make sure this is appropriate here)
  // blink_led(100, 3); // Blink LED as a signal (make sure this is appropriate here)
}

bool connectWifi(const char* ssid, const char* password) {
  WiFi.begin(ssid, password);

  while (!improvSerial.isConnected()) {
    blink_led(500, 1);
  }

  return true;
}










// FILESYSTEM INIT
bool startFilesystem() {
  if (LittleFS.begin()) {
    File root = LittleFS.open("/", "r");
    File file = root.openNextFile();
    Serial.println("Webserver files");
    while (file) {
      Serial.printf("FS File: %s, size: %d\n", file.name(), file.size());
      file = root.openNextFile();
    }
    return true;
  } else {
    Serial.println("ERROR on mounting filesystem. It will be formmatted!");
    LittleFS.format();
    ESP.restart();
  }
  return false;
}


/*
  Getting FS info (total and free bytes) is strictly related to
  filesystem library used (LittleFS, FFat, SPIFFS etc etc) and ESP framework
*/
#ifdef ESP32
void getFsInfo(fsInfo_t* fsInfo) {
  fsInfo->totalBytes = LittleFS.totalBytes();
  fsInfo->usedBytes = LittleFS.usedBytes();
  strcpy(fsInfo->fsName, "LittleFS");
}
#endif

//---------------------------------------
// for the demo ledtest.html on ESP8266 version litlefs, not very useful, page does not now state
void handleLed(AsyncWebServerRequest* request) {
  static int value = false;
  // http://xxx.xxx.xxx.xxx/led?val=1
  if (request->hasParam("val")) {
    value = request->arg("val").toInt();
    digitalWrite(gpio_relais_pin, value);
  }
  String reply = "LED is now ";
  reply += value ? "ON" : "OFF";
  request->send(200, "text/plain", reply);
}


// In this example a custom websocket event handler is used instead default
void onWsEvent(AsyncWebSocket* server, AsyncWebSocketClient* client, AwsEventType type, void* arg, uint8_t* data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      client->printf("{\"Websocket connected\": true, \"clients\": %u}", client->id());
      Serial.printf("luberth Websocket client %u connected\n", client->id());
      break;

    case WS_EVT_DISCONNECT:
      Serial.printf("luberth Websocket client %u connected\n", client->id());
      break;

    case WS_EVT_DATA:
      {
        AwsFrameInfo* info = (AwsFrameInfo*)arg;
        if (info->opcode == WS_TEXT) {
          data[len] = '\0';  // Null-terminate the data to parse as string
          Serial.printf("luberth Received message \"%s\"\n", data);

          if (strcmp((char*)data, "toggle") == 0) {
            ledState = !ledState;
            //notifyClients();
            ws.textAll(String(ledState));
            digitalWrite(gpio_relais_pin, ledState);
          }
          // Parse JSON message
          DynamicJsonDocument doc(1024);  // Adjust size according to your expected message size
          DeserializationError error = deserializeJson(doc, data);
          if (error) {
            // Handle the error, e.g., send an error message back to the client
            Serial.println("Failed to parse JSON!");
            return;
          }

          // Assuming the JSON structure is an array of objects like [{"on":60,"off":75}, ...]
          JsonArray array = doc.as<JsonArray>();
          for (JsonObject obj : array) {
            int onTime = obj["on"];    // Get ON time in minutes
            int offTime = obj["off"];  // Get OFF time in minutes

            // Now you would use onTime and offTime to schedule the GPIO pin control
            // This is where you would add your timing logic
            // For simplicity, let's assume we toggle the pin immediately as an example
            //digitalWrite(controlPin, HIGH); // Turn ON the GPIO pin
            //delay(onTime * 60000); // Wait for ON time duration (convert minutes to milliseconds)
            //digitalWrite(controlPin, LOW); // Turn OFF the GPIO pin
            //delay(offTime * 60000); // Wait for OFF time duration (convert minutes to milliseconds)
          }
        }
      }
      break;

    default:
      break;
  }
}




void updateLEDCount(int newCount) {
  ws2812fx.strip_off(); // Turn off all LEDs
  ws2812fx.~WS2812FX(); // Explicitly call the destructor (not recommended without full understanding)
  new (&ws2812fx) WS2812FX(newCount, LED_PIN, NEO_GRB + NEO_KHZ800); // Reconstruct the object
  ws2812fx.init();
  ws2812fx.start();
}




void setup() {




  Serial.begin(115200);
  delay(500);
  // Print 20 empty lines
  for (int i = 0; i < 20; i++) {
    Serial.println(".");
  }
 modes.reserve(5000);
  modes_setup();





  pinMode(LED_BUILTIN, OUTPUT);

  //WiFi.mode(WIFI_STA);
  //WiFi.disconnect();

  improvSerial.setDeviceInfo(ImprovTypes::ChipFamily::CF_ESP8266, "Visual TimeSlots Scheduler", "8-march-24", "Visual TimeSlots Scheduler", "http://{LOCAL_IPV4}/index.html");
  improvSerial.onImprovError(onImprovWiFiErrorCb);
  improvSerial.onImprovConnected(onImprovWiFiConnectedCb);
  improvSerial.setCustomConnectWiFi(connectWifi);  // Optional

  blink_led(50, 5);




  if (startFilesystem()) {
    Serial.println("LittleFS filesystem ready!");
    File config = server.getConfigFile("r");
    if (config) {
      DynamicJsonDocument doc(config.size() * 2);
      deserializeJson(doc, config);
      gpio_relais_pin = doc["gpio_relais_pin"];
      LED_PIN=doc["WS2812_LED_PIN"];
      LED_COUNT=doc["WS2812_LED_COUNT"];
      hostname = doc["mDNS"];
      myhostname = hostname;
      GMT_Time_Offset_sec = doc["GMT_Time_Offset_sec"];
      gpio_input_button_pin = doc["gpio_input_button_pin"];
    }
    Serial.println("");
    Serial.printf("Stored \"gpio_relais_pin\" value: %d\n", gpio_relais_pin);
    Serial.printf("Stored \"gpio_input_button_pin\" value: %d\n", gpio_input_button_pin);
    Serial.printf("Stored \"WS2812_LED_PIN\" value: %d\n", LED_PIN);
    Serial.printf("Stored \"WS2812_LED_COUNT\" value: %d\n", LED_COUNT);
    Serial.printf("Stored \"mDNS hostname\" value: %s\n", hostname);
    Serial.printf("Stored \"GMT_Time_Offset_sec\" value: %d\n", GMT_Time_Offset_sec);
  } else {
    Serial.println("LittleFS error!");
  }
  Serial.println("");

  pinMode(gpio_relais_pin, OUTPUT);

  IPAddress myIP = server.startWiFi(15000, "ESP32_AP1234", "");
  WiFi.setSleep(WIFI_PS_NONE);

  server.addOptionBox("Custom");

  server.addOption("gpio_relais_pin", gpio_relais_pin);
  server.addOption("gpio_input_button_pin", gpio_input_button_pin);

 server.addOption("WS2812_LED_PIN",  LED_PIN);
 server.addOption("WS2812_LED_COUNT",  LED_COUNT);
 
  server.addHTML("mDNS .local is added by ESP<br><br><a href=\"https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs\" target=\"_blank\">https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs</a>", "mDNS_text_id", 0);
  server.addOption("mDNS", hostname);
  server.addOption("GMT_Time_Offset_sec", GMT_Time_Offset_sec);

  server.setSetupPageTitle("The Art of Time Controlled");


  //ws2812fx.stop();
 // Create a new WS2812FX instance with updated parameters
  //ws2812fx = WS2812FX(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

  
  updateLEDCount(LED_COUNT);
  Serial.println("WS2812FX setup");
  ws2812fx.init();
  ws2812fx.setMode(FX_MODE_STATIC);
  ws2812fx.setColor(0x0000FF);
  ws2812fx.setSpeed(2500);
  ws2812fx.setBrightness(20);
  ws2812fx.start();

  // Enable ACE FS file web editor and add FS info callback fucntion
  server.enableFsCodeEditor();
#ifdef ESP32
  server.setFsInfoCallback(getFsInfo);
#endif

  // Default headers for all responses
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");

  /*
    server.onNotFound([](AsyncWebServerRequest * request) {
      Serial.println("Handling Not Found");
      if (LittleFS.exists("/index.html")) {
        Serial.println("index.html exists. Serving it now...");
        request->send(LittleFS, "/index.html", "text/html");
      } else {
        Serial.println("index.html not found in LittleFS");
        request->send(404, "text/plain", "404: Not Found");
      }
    });
  */
  server.on("/led", HTTP_GET, handleLed);

  // Define route for "/ace" to serve "ace.html"
  server.on("/ace", HTTP_GET, [](AsyncWebServerRequest * request) {
    if (LittleFS.exists("/ace.html")) {
      Serial.println("/ace requested. Serving ace.html now...");
      request->send(LittleFS, "/ace.html", "text/html");
    }
  });





  Serial.println("HTTP server setup");
  //server.on("/", srv_handle_index_html);
 // server.on("/main.js", srv_handle_main_js);
 // server.on("/modes", srv_handle_modes);
 // server.on("/set", srv_handle_set);
//  server.onNotFound(srv_handle_not_found);


 server.on("/set", HTTP_GET, [](AsyncWebServerRequest *request) {
    handleSetRequest(request);
  });

  server.on("/modes", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", modes);
  });




server.on("/getSettings", HTTP_GET, [](AsyncWebServerRequest *request){
  DynamicJsonDocument doc(1024);
  doc["mode"] = ws2812fx.getModeName(ws2812fx.getMode());
  doc["speed"] = String(ws2812fx.getSpeed());
  doc["brightness"] = ws2812fx.getBrightness();
  
  String response;
  serializeJson(doc, response);
  request->send(200, "application/json", response);
});


  server.on("/bulb.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    if (request->hasHeader("Referer")) {
      AsyncWebHeader* refererHeader = request->getHeader("Referer");
      String refererValue = refererHeader->value();
      Serial.print("Referer: ");
      Serial.println(refererValue);

      // Check if the Referer does not contain "/ace"
      if (refererValue.indexOf("/ace") != -1 || refererValue.indexOf("/edit") != -1) {
        if (LittleFS.exists("/bulb.html")) {
          Serial.println("bulb.html exists. Serving it now without processing for editor...");
          request->send(LittleFS, "/bulb.html", "text/html");
        }
      } else {


        String path = "/bulb.html"; // Directly specify the file path
        String contentType = "text/html"; // We know it's an HTML file

        File file = LittleFS.open(path, "r");
        if (!file) {
          request->send(404, "text/html", "Oh No, Not found <a href=\"/\">/ home</a>");
          return;
        }

        String fileContent = file.readString();
        file.close();

        // Perform dynamic content replacement
        fileContent.replace("%STATE%", ledState ? "ON" : "OFF");
        fileContent.replace("%MDNS%", String(myhostname) + ".local");
        fileContent.replace("%IP%", WiFi.localIP().toString());

        request->send(200, contentType, fileContent);
      }
    }
  });






  server.on("/bulbs.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    if (request->hasHeader("Referer")) {
      AsyncWebHeader* refererHeader = request->getHeader("Referer");
      String refererValue = refererHeader->value();
      Serial.print("Referer: ");
      Serial.println(refererValue);

      // Check if the Referer does not contain "/ace"
      if (refererValue.indexOf("/ace") != -1 || refererValue.indexOf("/edit") != -1) {
        if (LittleFS.exists("/bulbs.html")) {
          Serial.println("bulbs.html exists. Serving it now without processing for editor...");
          request->send(LittleFS, "/bulbs.html", "text/html");
        }
      } else {
        String path = "/bulbs.html"; // Directly specify the file path
        String contentType = "text/html"; // We know it's an HTML file

        File file = LittleFS.open(path, "r");
        if (!file) {
          request->send(404, "text/html", "Oh No, Not found <a href=\"/\">/ home</a>");
          return;
        }

        String fileContent = file.readString();
        file.close();

        // Perform dynamic content replacement
        fileContent.replace("%STATE%", ledState ? "ON" : "OFF");
        fileContent.replace("%MDNS%", String(myhostname) + ".local");
        fileContent.replace("%IP%", WiFi.localIP().toString());

        request->send(200, contentType, fileContent);
      }
    }

  });








  server.on("/nerd.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    if (request->hasHeader("Referer")) {
      AsyncWebHeader* refererHeader = request->getHeader("Referer");
      String refererValue = refererHeader->value();
      Serial.print("Referer: ");
      Serial.println(refererValue);

      // Check if the Referer does not contain "/ace"
      if (refererValue.indexOf("/ace") != -1 || refererValue.indexOf("/edit") != -1) {
        if (LittleFS.exists("/nerd.html")) {
          Serial.println("nerd.html exists. Serving it now without processing for editor...");
          request->send(LittleFS, "/nerd.html", "text/html");
        }

      } else {
        String path = "/nerd.html"; // Directly specify the file path
        String contentType = "text/html"; // We know it's an HTML file

        File file = LittleFS.open(path, "r");
        if (!file) {
          request->send(404, "text/html", "Oh No, Not found <a href=\"/\">/ home</a>");
          return;
        }

        String fileContent = file.readString();
        file.close();

        // Perform dynamic content replacement
        fileContent.replace("%STATE%", ledState ? "ON" : "OFF");
        fileContent.replace("%MDNS%", String(myhostname) + ".local");
        fileContent.replace("%IP%", WiFi.localIP().toString());

        request->send(200, contentType, fileContent);
      }
    }
  });







  /*
    server.onNotFound([](AsyncWebServerRequest * request) {
      Serial.println("Handling Not Found");
      if (LittleFS.exists("/index.html")) {
        Serial.println("index.html exists. Serving it now...");
        request->send(LittleFS, "/index.html", "text/html");
      } else {
        Serial.println("index.html not found in LittleFS");
        request->send(404, "text/plain", "404: Not Found");
      }
    });

  */








  // Start server
  // Init with custom WebSocket event handler and start server

  ws.onEvent(onWsEvent);
  server.addHandler(&ws);

  server.init(onWsEvent);
  //server.init();

  Serial.println("");
  Serial.print(F("Server started on IP Address: http://"));  // added http for webserial clickable link
  Serial.println(myIP);

  Serial.println(F(

                   "\n"
                   "Open /setup page tab custom to configure optional parameters.\n"
                   "\n"
                   "This is \"a simple Server .ino\" example.\n"
                   "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/simpleServerwithwebsocket.ino\n"
                   "\n"));


  // Check if we are in station mode before starting NTP
  if (WiFi.getMode() == WIFI_STA) {
    // Initialize NTP
    configTime(GMT_Time_Offset_sec, daylightOffset_sec, ntpServer);
    Serial.println("NTP client started");





    // there is sometihng with strings an chars i do not understand
    // thats why hostname and myhostname
    // otherwise i cannot get it to work
    if (MDNS.begin(myhostname)) {
      Serial.println("MDNS responder started.");
      Serial.print(F("Server started on IP Address: \033[32m http://"));
      Serial.print(myhostname);
      Serial.println(".local/");
      Serial.print("\033[0m"); // Reset color
      MDNS.addService("http", "tcp", 80);
      MDNS.setInstanceName(myhostname);  // Change "new-service-name" to your desired name
    } else {
      Serial.println("Error setting up MDNS responder!");
    }
  }
  Serial.println("");
  Serial.println("WiFi scan start");

  // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  if (n == 0) {
    Serial.println("no networks found");
  } else {
    Serial.print(n);
    Serial.println(" networks found");
    for (int i = 0; i < n; ++i) {
      // Print SSID and RSSI for each network found
      Serial.print(i + 1);
      Serial.print(": ");
      Serial.print(WiFi.SSID(i));
      Serial.print(" (");
      Serial.print(WiFi.RSSI(i));
      Serial.print(" dBm)");
      Serial.println((WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*");
      delay(10);
    }
  }
  Serial.println("");
}








unsigned long dotpreviousMillis = 0;  // Stores last time a dot was printed
const long dotinterval = 1000;        // Interval at which to print dot (milliseconds)



void loop() {
  unsigned long now = millis();

  improvSerial.handleSerial();  //
ws2812fx.service();
  //if (improvSerial.isConnected()){
  //handleHttpRequest(); //removed luberth
  // }

  if (WiFi.status() == WL_CONNECTED) {
    MDNS.update();
  }

  static unsigned long lastPrintTime = 0;
  const unsigned long printInterval = 5000;  // Print every 10000 milliseconds (10 seconds)
  if (WiFi.getMode() == WIFI_STA && WiFi.status() == WL_CONNECTED) {
    unsigned long currentTime = millis();

    if (currentTime - lastPrintTime >= printInterval) {
      // Save the last time you printed the time
      lastPrintTime = currentTime;
      
// turned off mdns scan no smooth loop mode effects
      //browseService("http", "tcp");  // find other mdns devices in network
// turned off mdns scan no smooth loop mode effects      
ws2812fx.service();
      ws.textAll(String(ledState));

      improvSerial.handleSerial();  //
      ws2812fx.service();


      // Check WiFi connection and print the time
      if (WiFi.status() == WL_CONNECTED) {
        printLocalTime();
        Serial.print("This Server ");
        Serial.print("\033[32m"); // Set green color (other color codes available)

        Serial.print("http://");
        Serial.print(myhostname);
        Serial.print(".local   http://");
        Serial.println(WiFi.localIP());
        Serial.print("\033[0m"); // Reset color
        //Serial.println("flash https://ldijkman.github.io/async-esp-fs-webserver/");
      }
    } /*else {

      signed long dotcurrentMillis = millis();  // Grab the current time

      // Check if a second has passed; more precisely, if the interval has passed
      if (dotcurrentMillis - dotpreviousMillis >= dotinterval) {
        // Save the last time a dot was printed
        dotpreviousMillis = dotcurrentMillis;

        // Print a dot to the serial monitor
        Serial.print("."); // print a hartbeat dot, not all serial monitors show it nice
      }
    }*/
  }



  if(auto_cycle && (now - auto_last_change > 10000)) { // cycle effect mode every 10 seconds
   uint8_t next_mode = (ws2812fx.getMode() + 1) % ws2812fx.getModeCount();
    if(sizeof(myModes) > 0) { // if custom list of modes exists
     for(uint8_t i=0; i < sizeof(myModes); i++) {
        if(myModes[i] == ws2812fx.getMode()) {
         next_mode = ((i + 1) < sizeof(myModes)) ? myModes[i + 1] : myModes[0];
         break;
        }
      }
    }
    ws2812fx.setMode(next_mode);
    Serial.print("mode is "); Serial.println(ws2812fx.getModeName(ws2812fx.getMode()));
    auto_last_change = now;
  }

  
}




















// bit changed for ESP8266
void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  // Buffer to hold the formatted time. Adjust size if needed.
  char buffer[64];
  // Format the time and store it in buffer. The format string can be adjusted as per your needs.
  strftime(buffer, sizeof(buffer), "%A, %B %d %Y %H:%M:%S", &timeinfo);
  // Print the formatted time
  Serial.println(buffer);

  // Broadcast current time to all connected WebSocket clients
  ws.textAll(buffer);
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
#ifdef ESP32
      hostnameLower = String(MDNS.hostname(i)) + ".local";  // Concatenate ".local" to the hostname
#endif

      // Now print the details, using the lowercase hostname
      //Serial.printf("   %d: http://%s - http://%s port:%d\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str(), MDNS.port(i));
      Serial.print("\033[32m"); // Set green color (other color codes available)
      Serial.printf("   %d: http://%s - http://%s\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str());
      Serial.print("\033[0m"); // Reset color

ws2812fx.service();


      // Serial.printf("  %d: http://%s - http://%s port:%d\n", i + 1, (MDNS.hostname(i).c_str()).toLowerCase(), MDNS.IP(i).toString().c_str(), MDNS.port(i));
      // make ip clickable weblink addon doenst do :port
      // http://Living.local uppercase L does not work
      // https://github.com/xtermjs/xterm.js/issues/4964



      // Add service details to the JSON array
      JsonObject serviceObj = services.createNestedObject();
#ifdef ESP8266
      serviceObj["mdnsname"] = MDNS.hostname(i);
#endif
#ifdef ESP32
      serviceObj["mdnsname"] = String(MDNS.hostname(i)) + ".local";
#endif
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























void blink_led(int d, int times) {
  for (int j = 0; j < times; j++) {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(d);
    digitalWrite(LED_BUILTIN, LOW);
    delay(d);
  }
}








/*
 * Build <li> string for all modes.
 */
void modes_setup() {
  modes = "";
  uint8_t num_modes = sizeof(myModes) > 0 ? sizeof(myModes) : ws2812fx.getModeCount();
  for(uint8_t i=0; i < num_modes; i++) {
    uint8_t m = sizeof(myModes) > 0 ? myModes[i] : i;
    modes += "<li><a href='#'>";
    modes += ws2812fx.getModeName(m);
    modes += "</a></li>";
  }
}

/* #####################################################
#  Webserver Functions
##################################################### */

//void srv_handle_not_found() {
 // String htmlContent = String(FPSTR(index_html)); // Convert PROGMEM content to String
  
  
  // Replace the placeholder with the actual speed value
 // htmlContent.replace("%speed%", String(ws2812fx.getSpeed()));
 //htmlContent.replace("%color%", String(tmp));
 

//  server.send(200, "text/html", htmlContent);
  //server.send(404, "text/plain", "File Not Found");
 
//}

//void srv_handle_index_html() {
 // server.send_P(200,"text/html", index_html);
//}

//void srv_handle_main_js() {
 // server.send_P(200,"application/javascript", main_js);
//}


// Serve modes

 // server.on("/modes", HTTP_GET, [](AsyncWebServerRequest *request){
 //   request->send(200, "text/html", modes);
 // });

void handleSetRequest(AsyncWebServerRequest *request) {
  // Handle color change
  if (request->hasParam("c")) {
    AsyncWebParameter* p = request->getParam("c");
    uint32_t color = (uint32_t) strtol(p->value().c_str(), NULL, 10);
    if(color <= 0xFFFFFF) {
      ws2812fx.setColor(color);
    }
  }

  // Handle mode change
  if (request->hasParam("m")) {
    AsyncWebParameter* p = request->getParam("m");
    uint8_t mode = (uint8_t) strtol(p->value().c_str(), NULL, 10);
    uint8_t new_mode = sizeof(myModes) > 0 ? myModes[mode % sizeof(myModes)] : mode % ws2812fx.getModeCount();
    ws2812fx.setMode(new_mode);
    auto_cycle = false; // Assuming auto_cycle is a boolean variable controlling auto cycle feature
    Serial.print("mode is "); Serial.println(ws2812fx.getModeName(ws2812fx.getMode()));
  }

  // Handle brightness change
  if (request->hasParam("b")) {
    AsyncWebParameter* p = request->getParam("b");
    if(p->value()[0] == '-') {
      ws2812fx.setBrightness(ws2812fx.getBrightness() * 0.8);
    } else if(p->value()[0] == '+') {
      ws2812fx.setBrightness(min(max(ws2812fx.getBrightness(), 5) * 1.2, 255));
    } else {
      uint8_t brightness = (uint8_t) strtol(p->value().c_str(), NULL, 10);
      ws2812fx.setBrightness(brightness);
    }
    Serial.print("brightness is "); Serial.println(ws2812fx.getBrightness());
  }



  

if (request->hasParam("s")) {
    AsyncWebParameter* p = request->getParam("s");
    
    Serial.print("Received parameter: "); Serial.println(p->value()[0]);
    int currentSpeed = ws2812fx.getSpeed();
    Serial.print("Current speed: "); Serial.println(currentSpeed);

    if(p->value()[0] == '-') {
      Serial.print("- ");
      ws2812fx.setSpeed(max(currentSpeed, 5) * 1.2);
    }
    if(p->value()[0] == '+') {
      Serial.print("+ ");
      ws2812fx.setSpeed(max(currentSpeed, 5) * 0.8);
    }// else {
     // uint16_t speed = (uint16_t) strtol(p->value().c_str(), NULL, 10);
     // ws2812fx.setSpeed(speed);
   // }
    Serial.print("Updated speed is: "); Serial.println(ws2812fx.getSpeed());
}

  // Handle auto cycle toggle
  if (request->hasParam("a")) {
    AsyncWebParameter* p = request->getParam("a");
    auto_cycle = (p->value()[0] != '-');
    if(auto_cycle) {
      auto_last_change = 0; // Assuming auto_last_change is a timestamp for the last mode change
    }
  }

  // Respond to the request
  request->send(200, "text/plain", "OK");
}





/*
  <!--
  Copyright 2023 Dirk Luberth Dijkman Bangert 30 1619GJ Andijk The Netherlands
  The Art of Time Controlled. Visual TimeSlots Schedule.
  -->
*/
