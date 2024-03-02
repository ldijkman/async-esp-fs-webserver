document.addEventListener('DOMContentLoaded', function() {
    const floatingDiv = document.createElement('div');
    floatingDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 20px 0; font-size: 18px;';

    const links = [
            {href: 'https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs', color: 'blue', text: 'Github DOCS', title: 'Visit my GitHub Documentation'},
            {href: 'https://github.com/ldijkman/async-esp-fs-webserver/issues', color: 'yellowgreen', text: 'Issues', title: 'See GitHub Issues'},
            {href: 'https://github.com/ldijkman/async-esp-fs-webserver/discussions', color: 'yellowgreen', text: 'Discuss', title: 'Join the Discussion'},
            {href: 'https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html', color: 'lightblue', text: 'Serial-1', title: 'Serial Monitor with clickable links'},
            {href: 'https://ldijkman.github.io/async-esp-fs-webserver/WebSerial/index.html', color: 'lightblue', text: 'Serial-2', title: 'Serial Monitor 2'},
            {href: 'https://ldijkman.github.io/async-esp-fs-webserver/ESP_Tool_JS/esptool-js/index.html', color: 'lightblue', text: 'Serial-3', title: 'Serial Monitor 3'},
            {href: 'https://ldijkman.github.io/async-esp-fs-webserver/', color: 'limegreen', text: 'Flash 4mb ESP', title: 'Flash ESP8266 ESP32'}
       ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.style.cssText = `color: ${link.color}; text-decoration: none; margin: 0 20px; font-size: inherit;`;
        a.textContent = link.text;
        a.title = link.title; // Set the title attribute
        floatingDiv.appendChild(a);
    });

    // Nerd Dropup Menu Setup (existing code)
    const dropupContainer = document.createElement('div');
    dropupContainer.className = 'dropdown';
    dropupContainer.style.cssText = 'position: relative; display: inline-block; cursor: pointer;';

    const dropupButton = document.createElement('button');
    dropupButton.textContent = 'Nerd';
    dropupButton.className = 'dropbtn';
    dropupButton.style.cssText = 'background-color: #333; color: yellow; padding: 10px; font-size: 16px; border: none;';

    const dropupContent = document.createElement('div');
    dropupContent.className = 'dropdown-content';
    dropupContent.style.cssText = 'display: none; position: absolute; bottom: 100%; left: 0; background-color: yellow; min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1;';

    const dropupLinks = [
            {href: 'https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs/Improv_Wi-Fi/Improv-WiFi-Library-main', text: 'IMPROV WiFi Arduino Library', title: 'IMPROV WiFi Arduino Library Info'},
            {href: 'https://youtu.be/xjTACT1qO_8', text: 'Nice Explanation ESP wifi configuration', title: 'ESP WiFi Configuration Explanation'},
            {href: 'https://youtu.be/xPlN_Tk3VLQ?si=tUbkiZnYWNE_9c3S', text: 'ESP32', title: 'ESP32 Information'},
            {href: 'https://youtu.be/u5unB24lhC4?t=833', text: 'DroneBot Workshop ESP Tool JS video', title: 'ESP Tool JS Video'},
            {href: 'https://youtu.be/E8bdATqXM8c?si=jYuSPcyqIFQII45s', text: 'ESP Web Tools with Improv wifi connect, i should make it like this', title: 'ESP Web Tools with Improv WiFi Connect'}
    ];

    dropupLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.textContent = link.text;
        a.title = link.title; // Set the title attribute
        a.style.cssText = 'color: black; padding: 12px 16px; text-decoration: none; display: block;';
        dropupContent.appendChild(a);
    });

    dropupContainer.appendChild(dropupButton);
    dropupContainer.appendChild(dropupContent);
    floatingDiv.appendChild(dropupContainer);

    // Ai Popup Menu Setup
    const aiPopupContainer = document.createElement('div');
    aiPopupContainer.className = 'popup';
    aiPopupContainer.style.cssText = 'display: inline-block; position: relative; cursor: pointer;';

    const aiButton = document.createElement('button');
    aiButton.textContent = 'Ai';
    aiButton.style.cssText = 'background-color: #333; color: greenyellow; padding: 10px; font-size: 16px; border: none; margin: 0 20px;';

    const aiPopupContent = document.createElement('div');
    aiPopupContent.className = 'popup-content';
    //aiPopupContent.style.cssText = 'display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: #f9f9f9; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1;';

aiPopupContent.style.cssText = 'display: none; position: absolute; bottom: 100%; left: 0; transform: translateY(-10px); background-color: greenyellow; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1;';
    
    const aiLinks = [
        {href: 'https://js2ts.com', text: 'JavaScript to TypeScript'},
        {href: 'https://www.blackbox.ai/', text: 'BlackBox.Ai'},
        {href: 'https://copilot.microsoft.com', text: 'Ai Microsoft CoPilot'},
        {href: 'https://gemini.google.com/app', text: 'Ai Google Gemini'},
        {href: 'https://chat.openai.com/auth/login', text: 'Ai OpenAi ChatGPT '}
    ];

    aiLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.textContent = link.text;
         a.title = link.title; // Set the title attribute
        a.style.cssText = 'color: black; padding: 12px 16px; text-decoration: none; display: block;';
        aiPopupContent.appendChild(a);
    });

    aiPopupContainer.appendChild(aiButton);
    aiPopupContainer.appendChild(aiPopupContent);
    floatingDiv.appendChild(aiPopupContainer);

    document.body.appendChild(floatingDiv);

    // Toggle functions for menus
    dropupButton.onclick = function() {
        dropupContent.style.display = dropupContent.style.display === 'block' ? 'none' : 'block';
    };

    aiButton.onclick = function() {
        aiPopupContent.style.display = aiPopupContent.style.display === 'block' ? 'none' : 'block';
    };

    // Close the menus if the user clicks outside of them
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.popup button')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var popups = document.getElementsByClassName("popup-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
            for (i = 0; i < popups.length; i++) {
                var openPopup = popups[i];
                if (openPopup.style.display === 'block') {
                    openPopup.style.display = 'none';
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


*/
