document.addEventListener("DOMContentLoaded", function () {
  const floatingDiv = document.createElement("div");
  floatingDiv.style.cssText =
    "position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 20px 0; font-size: 18px;";

  const links = [
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs",
      color: "blue",
      text: "Github DOCS",
      title: "Visit my GitHub Documentation"
    },
    {
      href: "https://github.com/ldijkman/async-esp-fs-webserver/issues",
      color: "yellowgreen",
      text: "Issues",
      title: "See GitHub Issues"
    },
    {
      href: "https://github.com/ldijkman/async-esp-fs-webserver/discussions",
      color: "yellowgreen",
      text: "Discuss",
      title: "Join the Discussion"
    },
    {
      href: "https://ldijkman.github.io/async-esp-fs-webserver/",
      color: "limegreen",
      text: "Flash 4mb ESP",
      title: "Flash ESP8266 ESP32"
    }
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.style.cssText = `color: ${link.color}; text-decoration: none; margin: 0 20px; font-size: inherit;`;
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    floatingDiv.appendChild(a);
  });

  // Tools Popup Menu Setup
  const toolsPopupContainer = document.createElement("div");
  toolsPopupContainer.className = "popup";
  toolsPopupContainer.style.cssText =
    "display: inline-block; position: relative; cursor: pointer;";

  const toolsButton = document.createElement("button");
  toolsButton.textContent = "Source";
  toolsButton.style.cssText =
    "background-color: #333; color: cyan; padding: 10px; font-size: 16px; border: none; margin: 0 20px;";

  const toolsPopupContent = document.createElement("div");
  toolsPopupContent.className = "popup-content";
  toolsPopupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: cyan; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;";

  const toolsLinks = [
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/ino",
      text: "Arduino INO Sourcecode"
    },
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/data",
      text: "LittleFS data FileSystem"
    }
  ];

  toolsLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000;";
    toolsPopupContent.appendChild(a);
  });

  toolsPopupContainer.appendChild(toolsButton);
  toolsPopupContainer.appendChild(toolsPopupContent);
  floatingDiv.appendChild(toolsPopupContainer);

  // ... (same as before for Nerd and Ai menus)

  document.body.appendChild(floatingDiv);

  // Toggle functions for menus
  // ... (same as before for Nerd and Ai menus)

  toolsButton.onclick = function () {
    toolsPopupContent.style.display =
      toolsPopupContent.style.display === "block" ? "none" : "block";
  };

  // Close the menus if the user clicks outside of them
  // ... (same as before)

  // Serial Popup Menu Setup
  const SerialPopupContainer = document.createElement("div");
  SerialPopupContainer.className = "popup";
  SerialPopupContainer.style.cssText =
    "display: inline-block; position: relative; cursor: pointer;";

  const SerialButton = document.createElement("button");
  SerialButton.textContent = "Serial";
  SerialButton.style.cssText =
    "background-color: #333; color: orange; padding: 10px; font-size: 16px; border: none; margin: 0 20px;";

  const SerialPopupContent = document.createElement("div");
  SerialPopupContent.className = "popup-content";
  SerialPopupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: orange; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;";

  // Serial Links Setup
  const SerialLinks = [
    {
      href:
        "https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html",
      color: "lightblue",
      text: "Serial & send & clickable links ",
      title: "Serial Monitor with clickable links"
    },
    {
      href:
        "https://ldijkman.github.io/async-esp-fs-webserver/WebSerial/index.html",
      color: "lightblue",
      text: "Serial & send",
      title: "Serial Monitor 2"
    },
    {
      href:
        "https://ldijkman.github.io/async-esp-fs-webserver/ESP_Tool_JS/esptool-js/index.html",
      color: "lightblue",
      text: "Serial ESP-Tool",
      title: "Serial Monitor 3"
    }
  ];

  SerialLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000;";
    SerialPopupContent.appendChild(a);
  });

  SerialPopupContainer.appendChild(SerialButton);
  SerialPopupContainer.appendChild(SerialPopupContent);
  floatingDiv.appendChild(SerialPopupContainer);

  // ... (same as before for Nerd and Ai menus)

  document.body.appendChild(floatingDiv);

  // Toggle functions for menus
  // ... (same as before for Nerd and Ai menus)

  SerialButton.onclick = function () {
    SerialPopupContent.style.display =
      SerialPopupContent.style.display === "block" ? "none" : "block";
  };

  // Close the menus if the user clicks outside of them
  // ... (same as before)

  // Nerd Dropup Menu Setup (existing code)
  const dropupContainer = document.createElement("div");
  dropupContainer.className = "dropdown";
  dropupContainer.style.cssText =
    "position: relative; display: inline-block; cursor: pointer;";

  const dropupButton = document.createElement("button");
  dropupButton.textContent = "Nerd";
  dropupButton.className = "dropbtn";
  dropupButton.style.cssText =
    "background-color: #333; color: yellow; padding: 10px; font-size: 16px; border: none;";

  const dropupContent = document.createElement("div");
  dropupContent.className = "dropdown-content";
  dropupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; background-color: yellow; min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;";

  const dropupLinks = [
    {
      href: "https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/Improv_Wi-Fi/Improv-WiFi-Library-main",
      text: "IMPROV WiFi Arduino Library",
      title: "IMPROV WiFi Arduino Library Info"
    },
    {
      href: "",
      text: "",
      title: ""
    },
    {
      href: "https://randomnerdtutorials.com/esp32-esp8266-thermostat-web-server/",
      text: "add a randomnerd esp-thermostat-web-server?",
      title: "add a randomnerd esp-thermostat-web-server?"
    },
    {
      href: "https://randomnerdtutorials.com/esp32-esp8266-rgb-led-strip-web-server/",
      text: "add a randomnerd esp-rgb-led-strip-web-server?",
      title: "add a randomnerd esp-rgb-led-strip-web-server?"
    },
    {
      href: "",
      text: "",
      title: ""
    },
    {
      href: "https://youtu.be/pCBfz8GAJSk?si=3POK7dtZ8A75gWIl",
      text: "video bulbs.html auto show other devices in network",
      title: "video bulbs.html auto show other devices in network"
    },
       {
      href: "https://youtu.be/YS3hWK9fHIE",
      text: "Video Flash ESP8266 WS2812 LED strip Webserver Demo WS2812FX",
      title: "Video Flash ESP8266 WS2812 LED strip Webserver Demo WS2812FX"
    },
    {
      href: "https://youtu.be/5SzWE3oxlLI",
      text: "Video Flash WS2812 LED Strip WebServer WS2812F",
      title: "Video Flash WS2812 LED Strip WebServer WS2812F"
    },
    {
      href: "https://youtu.be/cen1SvpTsYk",
      text: "Can you Help me?",
      title: "Can you Help me?"
    }

     

    
    
  ];

  dropupLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000;";
    dropupContent.appendChild(a);
  });

  dropupContainer.appendChild(dropupButton);
  dropupContainer.appendChild(dropupContent);
  floatingDiv.appendChild(dropupContainer);

  // Ai Popup Menu Setup
  const aiPopupContainer = document.createElement("div");
  aiPopupContainer.className = "popup";
  aiPopupContainer.style.cssText =
    "display: inline-block; position: relative; cursor: pointer;";

  const aiButton = document.createElement("button");
  aiButton.textContent = "Ai";
  aiButton.style.cssText =
    "background-color: #333; color: greenyellow; padding: 10px; font-size: 16px; border: none; margin: 0 20px;";

  const aiPopupContent = document.createElement("div");
  aiPopupContent.className = "popup-content";
  //aiPopupContent.style.cssText = 'display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: #f9f9f9; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;';

  aiPopupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: greenyellow; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;";

  const aiLinks = [
    { href: "https://www.blackbox.ai/", text: "BlackBox.Ai" },
    { href: "https://copilot.microsoft.com", text: "Ai Microsoft CoPilot" },
    { href: "https://gemini.google.com/app", text: "Ai Google Gemini" },
    { href: "https://chat.openai.com/auth/login", text: "Ai OpenAi ChatGPT " }
  ];

  aiLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000;";
    aiPopupContent.appendChild(a);
  });

  aiPopupContainer.appendChild(aiButton);
  aiPopupContainer.appendChild(aiPopupContent);
  floatingDiv.appendChild(aiPopupContainer);

  document.body.appendChild(floatingDiv);

  // Toggle functions for menus
  dropupButton.onclick = function () {
    dropupContent.style.display =
      dropupContent.style.display === "block" ? "none" : "block";
  };

  aiButton.onclick = function () {
    aiPopupContent.style.display =
      aiPopupContent.style.display === "block" ? "none" : "block";
  };











 // ESP Popup Menu Setup
  const ESPPopupContainer = document.createElement("div");
  ESPPopupContainer.className = "popup";
  ESPPopupContainer.style.cssText =
    "display: inline-block; position: relative; cursor: pointer;";

  const ESPButton = document.createElement("button");
  ESPButton.textContent = "ESP Links";
  ESPButton.style.cssText =
    "background-color: #333; color: cyan; padding: 10px; font-size: 16px; border: none; margin: 0 20px;";

  const ESPPopupContent = document.createElement("div");
  ESPPopupContent.className = "popup-content";
  ESPPopupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: cyan; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000;";

  const ESPLinks = [
        {
      href:
        "/status",
      text: "/scatus"
    },
    {
      href:
        "/scan",
      text: "/scan"
    },
        {
      href:
        "/reset",
      text: "/reset"
    },
    {
      href:
        "/wifistatus",
      text: "/wifistatus"
    },
    {
      href:
        "/wifi",
      text: "/wifi"
    },
     {
      href:
        "/nerd.html",
      text: "/nerd.html"
    },
     {
      href:
        "/bulb.html",
      text: "/bulb.html"
    },
     {
      href:
        "/bulbs.html",
      text: "/bulbs.html"
    },
         {
      href:
        "/2812.html",
      text: "/2812.html LED Strip"
    },
     {
      href:
        "/edit",
      text: "/edit"
    },
     {
      href:
        "/ace",
      text: "/ace"
    },
    {
      href:
        "/setup",
      text: "/setup"
    },
    {
      href:
        "/index.html",
      text: "/index.html"
    },
 {
      href:
        "https://play.google.com/store/apps/details?id=de.wellenvogel.bonjourbrowser&pli=1    ",
      text: "Android mDNS Scanner Browser",
      title: "Android Phone/tablet app, Easy Find linked list, Browse all mDNS Devices in your local nework?"
    }


  ];

  ESPLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000;";
    ESPPopupContent.appendChild(a);
  });

  ESPPopupContainer.appendChild(ESPButton);
  ESPPopupContainer.appendChild(ESPPopupContent);
  floatingDiv.appendChild(ESPPopupContainer);

  // ... (same as before for Nerd and Ai menus)

  document.body.appendChild(floatingDiv);

  // Toggle functions for menus
  // ... (same as before for Nerd and Ai menus)

  ESPButton.onclick = function () {
    ESPPopupContent.style.display =
      ESPPopupContent.style.display === "block" ? "none" : "block";
  };

  // Close the menus if the user clicks outside of them
  // ... (same as before)









  



 // Pinout Popup Menu Setup
  const PinoutPopupContainer = document.createElement("div");
  PinoutPopupContainer.className = "popup";
  PinoutPopupContainer.style.cssText =
    "display: inline-block; position: relative; cursor: pointer;";

  const PinoutButton = document.createElement("button");
  PinoutButton.textContent = "Pinout";
  PinoutButton.style.cssText =
    "background-color: #333; color: cyan; padding: 10px; font-size: 16px; border: none; margin: 0 20px;";

  const PinoutPopupContent = document.createElement("div");
  PinoutPopupContent.className = "popup-content";
  PinoutPopupContent.style.cssText =
    "display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: cyan; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 25000 !important;";

  const PinoutLinks = [
        {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/NodeMCU-V3-2.png",
      text: "NodeMCU-V3-2"
    },
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/WeMos-D1-mini-esp8266-pinout-mischianti.png",
      text: "WeMos-D1-mini-esp8266-pinout-mischianti"
    },
        {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/D1_Mini_ESP32_USBC.png",
      text: "D1_Mini_ESP32_USBC"
    },
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/ESP32-DOIT-DEV-KIT-v1-pinout-mischianti.png",
      text: "ESP32-DOIT-DEV-KIT-v1-pinout-mischianti"
    },
    {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/WeMos-D1-mini-esp8266-pinout-mischianti%20(1).png",
      text: "WeMos-D1-mini-esp8266-pinout 12E 12F"
    },
     {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/Wemos-D1-Pin-UNO_Footprint.jpg",
      text: "Wemos-D1-Pin-UNO_Footprint"
    },
     {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/wemos_d1_r32_uno_footprint.png",
      text: "wemos_d1_r32_uno_footprint"
    },
     {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/ESP32_WROOM-36-Pin.jpg",
      text: "ESP32_WROOM-36-Pin"
    },
         {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/ESP32_WROOM-38-Pin.jpg",
      text: "ESP32_WROOM-38-Pin"
    },
     {
      href:
        "https://github.com/ldijkman/async-esp-fs-webserver/blob/master/docs/pinouts/ESP32-WROOM-30pin-DOIT-DEV-KIT-v1-pinout-mischianti%20(1).png",
      text: "ESP32-WROOM-30pin-DOIT-DEV-KIT-v1"
    },
     {
      href:
        "",
      text: ""
    },
    {
      href:
        "",
      text: ""
    },
    {
      href:
        "",
      text: ""
    }
  ];


  PinoutLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    a.title = link.title; // Set the title attribute
    a.style.cssText =
      "color: black; padding: 12px 16px; text-decoration: none; display: block; z-index: 25000 !important;";
    PinoutPopupContent.appendChild(a);
  });

  PinoutPopupContainer.appendChild(PinoutButton);
  PinoutPopupContainer.appendChild(PinoutPopupContent);
  floatingDiv.appendChild(PinoutPopupContainer);

  // ... (same as before for Nerd and Ai menus)

  document.body.appendChild(floatingDiv);

  // Toggle functions for menus
  // ... (same as before for Nerd and Ai menus)

  PinoutButton.onclick = function () {
    PinoutPopupContent.style.display =
      PinoutPopupContent.style.display === "block" ? "none" : "block";
  };

  // Close the menus if the user clicks outside of them
  // ... (same as before)


 










  
  

  

  // Close the menus if the user clicks outside of them
  window.onclick = function (event) {
    if (
      !event.target.matches(".dropbtn") &&
      !event.target.matches(".popup button")
    ) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var popups = document.getElementsByClassName("popup-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
      for (i = 0; i < popups.length; i++) {
        var openPopup = popups[i];
        if (openPopup.style.display === "block") {
          openPopup.style.display = "none";
        }
      }
    }
  };
 
});

/*
  <script type="module" src="https://ldijkman.github.io/async-esp-fs-webserver/ESP_Web_Tools/install-button.js?module"></script>
  
      <esp-web-install-button manifest="https://ldijkman.github.io/async-esp-fs-webserver/both.json">
          <button slot="activate">Flash 4mb ESP8266 / ESP32</button>
          <span style="color: red; font-size: 24px; font-weight: bold;" slot="unsupported">Ah Damn, your browser doesn't work! <br>Open this Page in a Chromium Based PC Browser!<br>and an Connect Install button will be here!</span>
          <span style="color: red; font-size: 24px; font-weight: bold;" slot="not-allowed">Ah Damn, you are not allowed to use this on HTTP!</span>
       </esp-web-install-button>
  // Check if the current protocol is HTTPS
  if (window.location.protocol === "https:") {
// Dynamically load and append the script to the document
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://ldijkman.github.io/async-esp-fs-webserver/ESP_Web_Tools/install-button.js?module';
  document.head.appendChild(script);
  // Use setTimeout to delay the button creation
    setTimeout(function () {
  // Create the esp-web-install-button and its content
  const espWebInstallButton = document.createElement('esp-web-install-button');
  espWebInstallButton.setAttribute('manifest', 'https://ldijkman.github.io/async-esp-fs-webserver/both.json');

  const buttonSlot = document.createElement('button');
  buttonSlot.setAttribute('slot', 'activate');
  buttonSlot.textContent = 'Flash 4mb ESP8266 / ESP32';
  espWebInstallButton.appendChild(buttonSlot);

  const unsupportedSpan = document.createElement('span');
  unsupportedSpan.setAttribute('slot', 'unsupported');
  unsupportedSpan.style.cssText = 'color: red; font-size: 24px; font-weight: bold;';
  unsupportedSpan.innerHTML = "Ah Damn Browser";
  espWebInstallButton.appendChild(unsupportedSpan);

  const notAllowedSpan = document.createElement('span');
  notAllowedSpan.setAttribute('slot', 'not-allowed');
  notAllowedSpan.style.cssText = 'color: red; font-size: 24px; font-weight: bold;';
  notAllowedSpan.textContent = "Ah Damn HTTP!";
  espWebInstallButton.appendChild(notAllowedSpan);

  // Append the esp-web-install-button to the body or to a specific element on the page
  document.body.appendChild(espWebInstallButton);
      }, 5000); // Delay in milliseconds, 5000ms = 5 seconds
  }

*/
