
# The Art of Time Controlled

upload to 4mb ESP32 from browser

https://ldijkman.github.io/async-esp-fs-webserver/

code not fully working yet
helpme?

```

// mdns is not working like it should








// starts as an wifi accespoint AP
// wifi name broadcasted in the air "ESP32_AP1234"
// no password used
// connect to it
// if connected browse to http://8.8.8.8/setup
// or browse to http://8.8.8.8/edit
// create a file index or scheduler.html in ace editor FS browsser
// copy the code from https://codepen.io/ldijkman/pen/LYaOgvW
// paste and save in ace editor FSbrowser
// browse to http://8.8.8.8/scheduler.html
//   or when made index.html
//       browse to http://8.8.8.8/  or http://8.8.8.8/index.html
// see when times are changed result in serial monitor
// now need to do someting with the times on the ESP



#include <FS.h>
#include <LittleFS.h>
#include <AsyncFsWebServer.h>  // https://github.com/cotestatnt/async-esp-fs-webserver
                               // Arduino IDE => Sketch => include library => Manage Libraries ->
                               // search for "cotestatnt AsyncEspFSWebserver" and install

#include <ArduinoJson.h>
#include "time.h"
#include <ESPmDNS.h>

int gpiopin = 21;
const  char* hostname = "garage.local";
      String myhostname=hostname;

AsyncFsWebServer server(80, LittleFS, "webserver");





// NTP server settings
const char* ntpServer = "time.google.com";
const long gmtOffset_sec = 0;         // Adjust according to your timezone
const int daylightOffset_sec = 3600;  // Typically 3600 for 1 hour, or 0 if not using DST

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
  delay(1000);

  if (startFilesystem()) {
    Serial.println("LittleFS filesystem ready!");
    File config = server.getConfigFile("r");
    if (config) {
      DynamicJsonDocument doc(config.size() * 2);
      deserializeJson(doc, config);
      gpiopin = doc["gpio"];
      hostname = doc["mdns"];
      myhostname=hostname;
    }
    Serial.printf("Stored \"gpiopin\" value: %d\n", gpiopin);
    Serial.printf("Stored \"hostname\" value: %s\n", hostname);
  } else 
    Serial.println("LittleFS error!");
  


  IPAddress myIP = server.startWiFi(15000, "ESP32_AP1234", "");
  WiFi.setSleep(WIFI_PS_NONE);

  server.addOptionBox("Custom");

  server.addOption("gpio", gpiopin);
  server.addOption("mdns", hostname);

  server.setSetupPageTitle("Simple Async ESP FS WebServer");




  // Enable ACE FS file web editor and add FS info callback fucntion
  server.enableFsCodeEditor();
#ifdef ESP32
  server.setFsInfoCallback(getFsInfo);
#endif

 // // Server index.html at the root path
 // server.on("/index.html", HTTP_GET, [](AsyncWebServerRequest* request) {
 //   request->send(LittleFS, "/index.html", "text/html");
 // });
// Add custom page handlers
 // server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
  //  request->send(200,  "/index.html", "text/html");
 // });


  // Start server
  // Init with custom WebSocket event handler and start server
  server.init(onWsEvent);
 //server.init();

  Serial.println("");
  Serial.print(F("Async ESP Web Server started on IP Address: "));
  Serial.println(myIP);
  
  Serial.println(F(
    "\nif ip 8.8.8.8 AccessPoint connect wifi direct to \"ESP32_AP1234\"\nand configure wifi in http://8.8.8.8/setup\n"
    "\n"
    "This is \"simpleServer.ino\" example.\n"
    "Open /setup page to configure optional parameters.\n"
    "Open /edit for Ace editor FileSystem Browser./n"
    "\n"  
    "for a scheduler copy paste source from https://codepen.io/ldijkman/pen/LYaOgvW"
  ));

  // Check if we are in station mode before starting NTP
  if (WiFi.getMode() == WIFI_STA) {
    // Initialize NTP
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
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
} else {
    Serial.println("Error setting up MDNS responder!");
}
  }


}

void loop() {

  
  static unsigned long lastPrintTime = 0;
  const unsigned long printInterval = 10000;  // Print every 10000 milliseconds (10 seconds)

  unsigned long currentTime = millis();
  if (currentTime - lastPrintTime >= printInterval) {
    // Save the last time you printed the time
    lastPrintTime = currentTime;

    // Check WiFi connection and print the time
    if (WiFi.status() == WL_CONNECTED) {
      printLocalTime();
      Serial.print("mDNS responder started at ");
      Serial.print("http://");
      Serial.print(myhostname);
      Serial.println(".local");
    }

  }


  
}



void printLocalTime() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }
  // Print the local time
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}



```
