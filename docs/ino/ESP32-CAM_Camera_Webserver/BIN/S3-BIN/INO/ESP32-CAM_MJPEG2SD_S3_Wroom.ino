/*
* Capture ESP32 Cam JPEG images into a AVI file and store on SD
* AVI files stored on the SD card can also be selected and streamed to a browser as MJPEG.
*
* s60sc 2020 - 2024
* 
*/

 
/* 
      Luberth Leads the way to some Minor changes
      Search all sketch tabs to see
*/

#include "appGlobals.h"
#include <ESPmDNS.h>
  


void setup() {  
  logSetup();
  // prep SD card storage
  if (startStorage()) {
    // Load saved user configuration
    if (loadConfig()) {
      // initialise camera
      if (psramFound()) {
        LOG_INF("PSRAM size: %s", fmtSize(esp_spiram_get_size()));
        if (esp_spiram_get_size() > 3 * ONEMEG) prepCam();
        else snprintf(startupFailure, SF_LEN, STARTUP_FAIL "Insufficient PSRAM for app");
      }
      else snprintf(startupFailure, SF_LEN, STARTUP_FAIL "Need PSRAM to be enabled");
    }
  }
  
#ifdef DEV_ONLY
  devSetup();
#endif

  // connect wifi or start config AP if router details not available
  startWifi();

  startWebServer();
  if (strlen(startupFailure)) LOG_WRN("%s", startupFailure);
  else {
    // start rest of services
    startSustainTasks(); 
#if INCLUDE_SMTP
    prepSMTP(); 
#endif
#if INCLUDE_FTP_HFS
    prepUpload();
#endif
    prepPeripherals();
#if INCLUDE_MIC
    prepMic(); 
#endif
#if INCLUDE_TELEM
    prepTelemetry();
#endif
#if INCLUDE_TGRAM
    prepTelegram();
#endif
    prepRecording(); 
    checkMemory();
  } 

/*
    if (MDNS.begin(myhostname)) {
    Serial.println("MDNS responder started.");
    Serial.print("You should be able to connect with address http://");
    Serial.print("\033[32m"); // Set green color (other color codes available)

    Serial.print(myhostname);
    Serial.println(".local/");
    MDNS.addService("http", "tcp", 80);
    MDNS.setInstanceName(myhostname);  // Change "new-service-name" to your desired name
    Serial.print("\033[0m"); // Reset color
  } else {
    Serial.println("Error setting up MDNS responder!");
  }
  */
}

void loop() {
  // confirm not blocked in setup
  LOG_INF("=============== Total tasks: %u ===============\n", uxTaskGetNumberOfTasks() - 1);
  delay(1000);
  vTaskDelete(NULL); // free 8k ram
}
