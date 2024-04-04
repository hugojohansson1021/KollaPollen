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


// Show active menu when scrolling
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#tjanster-page');
    const servicesMenu = document.querySelector('#priser-page');

    const algMenu = document.querySelector('#alg-page');
    const almMenu = document.querySelector('#alm-page');
    const bjorkMenu = document.querySelector('#bjork-page');
    const bokMenu = document.querySelector('#bok-page');
    const ekMenu = document.querySelector('#ek-page');
    const grasMenu = document.querySelector('#gras-page');
    const graboMenu = document.querySelector('#graabo-page');
    const malMenu = document.querySelector('#mal-page');

    
    let scrollPos = window.scrollY;
    // console.log(scrollPos);
  
    // adds 'highlight' class to my menu items
    if (window.innerWidth > 960 && scrollPos < 600) {
      homeMenu.classList.add('highlight');
      aboutMenu.classList.remove('highlight');
      return;
    } 
    else if (window.innerWidth > 960 && scrollPos < 1400) {
      aboutMenu.classList.add('highlight');
      homeMenu.classList.remove('highlight');
      servicesMenu.classList.remove('highlight');
      return;
    }
    else if (window.innerWidth > 1400 && scrollPos < 1900) {
        aboutMenu.classList.add('highlight');
        homeMenu.classList.remove('highlight');
        servicesMenu.classList.remove('highlight');
        return;
      }  
    else if (window.innerWidth > 960 && scrollPos < 2345) {
      servicesMenu.classList.add('highlight');
      aboutMenu.classList.remove('highlight');
      return;
    }
  
    if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
      elem.classList.remove('highlight');
    }
  };
  
  window.addEventListener('scroll', highlightMenu);
  window.addEventListener('click', highlightMenu);
  
  //  Close mobile Menu when clicking on a menu item
  const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active');
    if (window.innerWidth <= 768 && menuBars) {
      menu.classList.toggle('is-active');
      menuLinks.classList.remove('active');
    }
  };
  
  menuLinks.addEventListener('click', hideMobileMenu);
  navLogo.addEventListener('click', hideMobileMenu);
  