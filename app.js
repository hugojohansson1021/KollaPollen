document.addEventListener('DOMContentLoaded', function() {
    fetchRegions();
    let pollenTypes = {};

    fetch('https://api.pollenrapporten.se/v1/pollen-types')
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                pollenTypes[item.id] = item.name;
            });
        });

    document.getElementById('regionSelector').addEventListener('change', function() {
        var regionId = this.value;
        if (regionId) {
            fetchPollenInfo(regionId, pollenTypes);
        }
    });
});

function fetchRegions() {
    fetch('https://api.pollenrapporten.se/v1/regions')
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('regionSelector');
            data.items.forEach(function(region) {
                var option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.name;
                select.appendChild(option);
            });
        });
}

function fetchPollenInfo(regionId, pollenTypes) {
    // Rensa tidigare information
    document.getElementById('pollenInfo').innerHTML = '';

    fetch(`https://api.pollenrapporten.se/v1/forecasts?region_id=${regionId}&current=true`)
        .then(response => response.json())
        .then(data => {
            let latestDate = "";
            let pollenLevels = {};

            data.items.forEach(function(forecast) {
                forecast.levelSeries.forEach(function(levelInfo) {
                    if (!latestDate || new Date(levelInfo.time) > new Date(latestDate)) {
                        latestDate = levelInfo.time;
                    }
                    pollenLevels[levelInfo.pollenId] = levelInfo.level;
                });
            });

            for (const [pollenId, level] of Object.entries(pollenLevels)) {
                var div = document.createElement('div');
                div.textContent = `${pollenTypes[pollenId]}: Nivå ${level}`;
                document.getElementById('pollenInfo').appendChild(div);
            }
        });
}




////MOBILE NAV BAR
const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar_menu')
const navLogo = document.querySelector('#navbar')

const mobileMenu = () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
};

menu.addEventListener('click',mobileMenu);



  
  