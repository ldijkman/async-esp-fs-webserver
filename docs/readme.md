
# The Art of Time Controlled

upload to 4mb ESP32 from browser

Flash 4mb ESP32 from InBrowser

https://ldijkman.github.io/async-esp-fs-webserver/

code not fully working yet
helpme?

- https://github.com/cotestatnt/async-esp-fs-webserver/issues/28

```

// mdns is working like it should
// only my android phone bonjourbrowser
//                       https://play.google.com/store/apps/details?id=de.wellenvogel.bonjourbrowser
//     ok now shows the correct set mdns adres http://garage.local

// even cheaper
// ESP8266 12E/12F 4mb Version (only little changes needed)

// need to make the on/off json websocket implemented 
// chat gpt4 knows it all howto do it

// do not use delay() in the code, it will result in reboot loop










// when in wifi ap or apsta mode no date time displayed in serial monitor
// only in wifi station mode  date time displayed  in serial monitor


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

int gpio_relais_pin = 21;                       // for future relais gpio pin
int gpio_input_button_pin=17;                   // for future override
const  char* hostname = "garage";       // .local is added by esp32 mdns   http://garage.local
String myhostname=hostname;
    

AsyncFsWebServer server(80, LittleFS, "webserver");





// NTP server settings
const char* ntpServer = "time.google.com";
// can be set from setup custom
long GMT_Time_Offset_sec = 0;      // Adjust according to your timezoneGMT_Time_Offset_sec = 0; 

const int daylightOffset_sec = 0;  // Typically 3600 for 1 hour, or 0 if not using DST

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
  


  IPAddress myIP = server.startWiFi(15000, "ESP32_AP1234", "");
  WiFi.setSleep(WIFI_PS_NONE);

  server.addOptionBox("Custom");

  server.addOption("gpio_relais_pin", gpio_relais_pin);
  server.addOption("gpio_input_button_pin", gpio_input_button_pin);
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

 // https://github.com/cotestatnt/async-esp-fs-webserver/issues/23
 // https://github.com/cotestatnt/async-esp-fs-webserver/issues/18




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
    MDNS.setInstanceName(myhostname); // Change "new-service-name" to your desired name
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
      Serial.print("mDNS at ");
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

![Screenshot from 2024-02-11 11-16-47](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/607b52b9-51d9-41c2-8d0a-fd53413513da)


![Screenshot from 2024-02-11 17-01-21](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/7a397514-bb32-4ce3-920f-a75252986527)


![Screenshot from 2024-02-11 17-01-30](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/bbd9ac93-9a0c-4f44-a767-e9a7633c88aa)

![Screenshot from 2024-02-11 17-01-38](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/c0bbf158-2975-42b5-9f90-b8e7d4b3e5cc)

![Screenshot from 2024-02-11 08-49-58](https://github.com/ldijkman/async-esp-fs-webserver/assets/45427770/6a2095b5-aa0f-4a00-99d2-d497e0caa839)








