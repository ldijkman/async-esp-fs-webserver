/*

Quick an dirty test of Improv wifi configuration

<!-- 
Copyright 2023 Dirk Luberth Dijkman Bangert 30 1619GJ Andijk The Netherlands    
The Art of Time Controlled. Visual TimeSlots Schedule.
-->
*/

// does ESP8266 4mb 12E / 12F  (switch AP to station not flawless with setup messages)
// does ESP32 4mb Wroom

// mdns is working like it should
// my android phone bonjourbrowser app lists it
//                       https://play.google.com/store/apps/details?id=de.wellenvogel.bonjourbrowser
//     ok now shows the correct set mdns adres http://garage.local
// choose a unique mdns adres for each ESP device like garden, living, toilet, hallway, stairs, kitchen, etcetera
// set mdns in /setup page tab custom

// even cheaper
// ESP8266 12E/12F 4mb Version (only little changes needed)

// need to make the on/off json websocket implemented
// chat gpt4 knows it all howto do it

// do not use delay() in the code, it will result in reboot loop

// when in wifi ap or apsta mode no date time displayed in serial monitor 115200
// only in wifi station mode  date time displayed  in serial monitor


// starts as an wifi accespoint AP
// wifi name broadcasted in the air "ESP32_AP1234"
// no password used
// connect wifi to it
// if connected browse to http://8.8.8.8/setup
// or browse to http://8.8.8.8/edit

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
#if defined(ESP32)
#include <ESPmDNS.h>
#include "WiFi.h"
#endif

#define LED_BUILTIN 2

#include <ESP8266WiFi.h>
#include <Esp.h>
#include <ImprovWiFiLibrary.h> //https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/Improv_Wi-Fi/Improv-WiFi-Library-main

//WiFiServer server(80);
ImprovWiFi improvSerial(&Serial);

char linebuf[80];
int charcount = 0;

int gpio_relais_pin = 2;         //wemos d1 esp32 led pin                 // for future relais gpio pin
int gpio_input_button_pin = 17;  // for future override

const char* hostname = "garage";  // .local is added by esp32 mdns   http://garage.local
String myhostname = hostname;

AsyncWebSocket ws("/ws");

AsyncFsWebServer server(80, LittleFS, "webserver");





// NTP server settings
const char* ntpServer = "time.google.com";
// can be set from setup custom
long GMT_Time_Offset_sec = 0;  // Adjust according to your timezoneGMT_Time_Offset_sec = 0;

const int daylightOffset_sec = 0;  // Typically 3600 for 1 hour, or 0 if not using DST





void onImprovWiFiErrorCb(ImprovTypes::Error err)
{
  //server.stop();
  blink_led(2000, 3);
}

#include <string.h> // For memset and memcpy
#include "user_interface.h" // For station_config, wifi_station_get_config_default, etc.

void onImprovWiFiConnectedCb(const char *ssid, const char *password)
{
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

bool connectWifi(const char *ssid, const char *password)
{
  WiFi.begin(ssid, password);

  while (!improvSerial.isConnected())
  {
    blink_led(500, 1);
  }

  return true;
}










// FILESYSTEM INIT
bool startFilesystem() {
  if (LittleFS.begin()) {
    File root = LittleFS.open("/", "r");
    File file = root.openNextFile();
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
* Getting FS info (total and free bytes) is strictly related to
* filesystem library used (LittleFS, FFat, SPIFFS etc etc) and ESP framework
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









void setup() {




  Serial.begin(115200);
  delay(500);
  // Print 20 empty lines
  for (int i = 0; i < 20; i++) {
    Serial.println(".");
  }


 pinMode(LED_BUILTIN, OUTPUT);

  //WiFi.mode(WIFI_STA);
  //WiFi.disconnect();

  improvSerial.setDeviceInfo(ImprovTypes::ChipFamily::CF_ESP8266, "ImprovWiFiLib", "1.0.0", "BasicWebServer", "http://{LOCAL_IPV4}/index.html");
  improvSerial.onImprovError(onImprovWiFiErrorCb);
  improvSerial.onImprovConnected(onImprovWiFiConnectedCb);
  improvSerial.setCustomConnectWiFi(connectWifi);  // Optional

  blink_led(100, 5);




  if (startFilesystem()) {
    Serial.println("LittleFS filesystem ready!");
    File config = server.getConfigFile("r");
    if (config) {
      DynamicJsonDocument doc(config.size() * 2);
      deserializeJson(doc, config);
      gpio_relais_pin = doc["gpio_relais_pin"];
      hostname = doc["mDNS"];
      myhostname = hostname;
      GMT_Time_Offset_sec = doc["GMT_Time_Offset_sec"];
      gpio_input_button_pin = doc["gpio_input_button_pin"];
    }
    Serial.printf("Stored \"gpio_relais_pin\" value: %d\n", gpio_relais_pin);
    Serial.printf("Stored \"gpio_input_button_pin\" value: %d\n", gpio_input_button_pin);
    Serial.printf("Stored \"mDNS hostname\" value: %s\n", hostname);
    Serial.printf("Stored \"GMT_Time_Offset_sec\" value: %d\n", GMT_Time_Offset_sec);
  } else
    Serial.println("LittleFS error!");

  pinMode(gpio_relais_pin, OUTPUT);

  IPAddress myIP = server.startWiFi(15000, "ESP32_AP1234", "");
  WiFi.setSleep(WIFI_PS_NONE);

  server.addOptionBox("Custom");

  server.addOption("gpio_relais_pin", gpio_relais_pin);
  server.addOption("gpio_input_button_pin", gpio_input_button_pin);
  server.addHTML("mDNS .local is added by ESP<br><br><a href=\"https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs\" target=\"_blank\">https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs</a>", "mDNS_text_id", 0);
  server.addOption("mDNS", hostname);
  server.addOption("GMT_Time_Offset_sec", GMT_Time_Offset_sec);

  server.setSetupPageTitle("The Art of Time Controlled");




  // Enable ACE FS file web editor and add FS info callback fucntion
  server.enableFsCodeEditor();
#ifdef ESP32
  server.setFsInfoCallback(getFsInfo);
#endif



  // if i activate next
  // there is no custom tab anymore on setup page for mdns and relais gpio pin setting
  // Server index.html at the root path
  // server.on("/index.html", HTTP_GET, [](AsyncWebServerRequest* request) {
  //   request->send(LittleFS, "/index.html", "text/html");
  // });

  server.onNotFound([](AsyncWebServerRequest* request) {
    Serial.println("Handling Not Found");
    if (LittleFS.exists("/index.html")) {
      Serial.println("index.html exists. Serving it now...");
      request->send(LittleFS, "/index.html", "text/html");
    } else {
      Serial.println("index.html not found in LittleFS");
      request->send(404, "text/plain", "404: Not Found");
    }
  });
  /*
void AsyncFsWebServer::notFound(AsyncWebServerRequest *request) {
    String pathTo404 = "/404.html"; // Path to your custom 404 page
    if (m_filesystem->exists(pathTo404)) {
        request->send(m_filesystem, pathTo404, "text/html");
    } else {
        request->send(404, "text/plain", "Not found");
    }
    log_debug("Resource %s not found\n", request->url().c_str());
}
*/

  server.on("/led", HTTP_GET, handleLed);

  // Define route for "/ace" to serve "ace.html"
  server.on("/ace", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (LittleFS.exists("/ace.html")) {
      Serial.println("/ace requested. Serving ace.html now...");
      request->send(LittleFS, "/ace.html", "text/html");
    }
  });

  // Start server
  // Init with custom WebSocket event handler and start server

  ws.onEvent(onWsEvent);
  server.addHandler(&ws);

  server.init(onWsEvent);
  //server.init();

  Serial.println("");
  Serial.print(F("Async ESP Web Server started on IP Address: http://"));  // added http for webserial clickable link
  Serial.println(myIP);

  Serial.println(F(
    "\nif ip 8.8.8.8 AccessPoint connect wifi direct to \"ESP32_AP1234\"\nand configure wifi in http://8.8.8.8/setup\n"
    "\n"
    "Open /setup page to configure optional parameters.\n"
    "Open /edit for Ace editor FileSystem Browser.\n"
    "\n"
    "This is \"a simple Server .ino\" example.\n"
    "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/simpleServerwithwebsocket.ino\n"
    "\n"
    "for a scheduler copy paste source from https://codepen.io/ldijkman/pen/LYaOgvW"));

  // Check if we are in station mode before starting NTP
  if (WiFi.getMode() == WIFI_STA) {
    // Initialize NTP
    configTime(GMT_Time_Offset_sec, daylightOffset_sec, ntpServer);
    Serial.println("NTP client started");

    // ESP32 Start MDSN responder



    // there is sometihng with strings an chars i do not understand
    // thats why hostname and myhostname
    // otherwise i cannot get it to work
    if (MDNS.begin(myhostname)) {
      Serial.println("MDNS responder started.");
      Serial.print("You should be able to connect with address http://");
      Serial.print(myhostname);
      Serial.println(".local/");
      MDNS.addService("http", "tcp", 80);
      MDNS.setInstanceName(myhostname);  // Change "new-service-name" to your desired name
    } else {
      Serial.println("Error setting up MDNS responder!");
    }

    
  }
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











void loop() {


  improvSerial.handleSerial(); // 

  if (improvSerial.isConnected()){
    //handleHttpRequest(); //removed luberth
  }







  if (WiFi.status() == WL_CONNECTED) {
#ifdef ESP8266
    MDNS.update();
#endif
  }

  static unsigned long lastPrintTime = 0;
  const unsigned long printInterval = 10000;  // Print every 10000 milliseconds (10 seconds)
  if (WiFi.getMode() == WIFI_STA && WiFi.status() == WL_CONNECTED) {
    unsigned long currentTime = millis();

    if (currentTime - lastPrintTime >= printInterval) {
      // Save the last time you printed the time
      lastPrintTime = currentTime;

      browseService("http", "tcp");  // find other mdns devices in network

      // Check WiFi connection and print the time
      if (WiFi.status() == WL_CONNECTED) {
        printLocalTime();
        Serial.print("mDNS at ");
        Serial.print("http://");
        Serial.print(myhostname);
        Serial.print(".local   http://");
        Serial.println(WiFi.localIP());
        Serial.println("flash https://ldijkman.github.io/async-esp-fs-webserver/");
      }
    }
    // else {
     // if (millis() / 1000) % 2){
     //     print(".");
    //    }
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
  Serial.printf("Browsing for service _%s._%s.local. ... ", service, proto);
  int n = MDNS.queryService(service, proto);  // Query mDNS service
  if (n == 0) {
    Serial.println("\nDamn, no services found\n Flash more Devices\n  And give each a Unique mDNS name in Setup tab Custom");
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
      Serial.printf("[W]  %d: http://%s - http://%s port:%d\n", i + 1, hostnameLower.c_str(), MDNS.IP(i).toString().c_str(), MDNS.port(i));

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























void blink_led(int d, int times)
{
  for (int j = 0; j < times; j++)
  {
    digitalWrite(LED_BUILTIN, HIGH);
    delay(d);
    digitalWrite(LED_BUILTIN, LOW);
    delay(d);
  }
}












<!-- 
Copyright 2023 Dirk Luberth Dijkman Bangert 30 1619GJ Andijk The Netherlands    
The Art of Time Controlled. Visual TimeSlots Schedule.
-->
*/









