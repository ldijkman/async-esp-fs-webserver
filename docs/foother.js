document.addEventListener('DOMContentLoaded', function() {
    const floatingDiv = document.createElement('div');
    floatingDiv.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; background-color: #333; color: white; text-align: center; padding: 20px 0; font-size: 18px;';

    const links = [
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/tree/master/docs', color: 'blue', text: 'Github DOCS Source'},
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/issues', color: 'yellowgreen', text: 'Issues'},
        {href: 'https://github.com/ldijkman/async-esp-fs-webserver/discussions', color: 'yellowgreen', text: 'Discussions'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/WebSerialMonitor.html', color: 'lightblue', text: 'Serial Monitor'},
        {href: 'https://ldijkman.github.io/async-esp-fs-webserver/', color: 'limegreen', text: 'Flash 4mb ESP inBrowser'}
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.style.cssText = `color: ${link.color}; text-decoration: none; margin: 0 20px; font-size: inherit;`;
        a.textContent = link.text;
        floatingDiv.appendChild(a);
    });

    const dropupContainer = document.createElement('div');
    dropupContainer.className = 'dropdown';
    dropupContainer.style.cssText = 'position: relative; display: inline-block; cursor: pointer;';

    const dropupButton = document.createElement('button');
    dropupButton.textContent = 'Nerd';
    dropupButton.className = 'dropbtn';
    dropupButton.style.cssText = 'background-color: #333; color: yellow; padding: 10px; font-size: 16px; border: none;';

    const dropupContent = document.createElement('div');
    dropupContent.className = 'dropdown-content';
    dropupContent.style.cssText = 'display: none; position: absolute; bottom: 100%; left: 0; background-color: #f1f1f1; min-width: 160px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1;';

    // Example links for the dropup menu
    const dropupLinks = [
        {href: '#', text: 'Link 1'},
        {href: 'https://youtu.be/u5unB24lhC4?t=833', text: 'DroneBot Workshop <br>ESP Tool JS video'},
        {href: '#', text: 'Link 3'}
    ];

    dropupLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.target = '_blank';
        a.textContent = link.text;
        a.style.cssText = 'color: black; padding: 12px 16px; text-decoration: none; display: block;';
        dropupContent.appendChild(a);
    });

    dropupContainer.appendChild(dropupButton);
    dropupContainer.appendChild(dropupContent);
    floatingDiv.appendChild(dropupContainer);

    document.body.appendChild(floatingDiv);

    dropupButton.onclick = function() {
        dropupContent.style.display = dropupContent.style.display === 'block' ? 'none' : 'block';
    }

    // Close the dropup menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
        }
    };
});
