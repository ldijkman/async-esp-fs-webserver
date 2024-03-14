content for WebServer LittleFS ESP filesystem


files may be changed / newer as on your ESP FileSystem

you could copy paste the code to your ESP witch Ace editor

https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/data

https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/data/Your_Input

---

some template processing on uplad webserver html files

text in html like %MDNS% changed on upload
```
String processor(const String& var) {
  // Check which placeholder needs to be replaced
  if (var == "STATE") {
    // Replace "%STATE%" with "ON" or "OFF" based on the ledState variable
    return ledState ? "ON" : "OFF";
  }
  else if (var == "MDNS") {
    // Replace "%MDNS%" with the device's mDNS hostname
    return String(myhostname) + ".local";
  }
  else if (var == "IP") {
    // Replace "%IP%" with the device's IP address
    return WiFi.localIP().toString();
  }
  // Add more placeholders as needed
  // If the placeholder does not match any known identifier, return an empty string
  return String();
}

```
