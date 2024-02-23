document.getElementById('searchbtn').addEventListener('click', function(event) { 
    event.preventDefault(); 

    async function fetchData() {
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
          method: 'GET',
          headers: {'x-zocom': 'solaris-2ngXkR6S02ijFrTP',
          'cache-control': 'no-cache'
        }
        });
      
        let data = await resp.json();
        console.log(data.bodies);

        let searchValue = document.getElementById('searchfield').value;
        let filteredData = data.bodies.filter(function(body) {
          return body.name.toLowerCase() === searchValue.toLowerCase();
        });

        if (filteredData.length > 0) {
            var planet = filteredData[0]; // antar att vi bara har ett matchande resultat
            console.log(planet);
            document.getElementById('overlayheader').innerHTML = planet.name;
            document.getElementById('overlayinfo').innerHTML = 
          'Circumference: ' + planet.circumference + ' km, ' +
          'Description: ' + planet.desc + ', ' +
          'Distance from Sun: ' + planet.distance + ' km, ' +
          'Orbital Period: ' + planet.orbitalPeriod + ' days, ' +
          'Rotation: ' + planet.rotation + ' hours, ' +
          'Temperature: ' + planet.temp.day + '°C (day), ' + planet.temp.night + '°C (night)';
            document.getElementById('overlay').style.display = 'block';
          }
        console.log(filteredData);
      }
      
      fetchData().catch(error => console.error(error));
});

let closebutton = document.getElementById('close')

closebutton.addEventListener('click', function() {
    var overlay = document.getElementById('overlay')
    overlay.style.display = 'none';

    var searchfield = document.getElementById('searchfield');
    searchfield.value = '';
});

var starsSection = document.getElementById('stars');
var starsSectionHeight = starsSection.getBoundingClientRect().height;
var starsSectionWidth = starsSection.getBoundingClientRect().width;

function createShootingStarAnimation(id, angle) {
    var styleSheet = document.styleSheets[0];
    var keyframes = `@keyframes shootingStar${id} {
        from { transform: translate(0, 0); }
        to { transform: translate(${Math.cos(angle) * starsSectionWidth}px, ${Math.sin(angle) * starsSectionHeight}px); }
      }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
}

for (var i = 0; i < 200; i++) {
    var newStar = document.createElement('div');
    newStar.className = 'star';
    newStar.style.top = Math.random() * starsSectionHeight + 'px';
    newStar.style.left = Math.random() * starsSectionWidth + 'px';
    newStar.style.animationDelay = Math.random() * 5 + 's';
    newStar.style.animationDuration = Math.random() * 5 + 's';

    // Endast 10% av stjärnorna blir stjärnfall
    if (Math.random() < 0.1) {
        var angle = Math.random() * (Math.PI / 3) + Math.PI / 3;
        createShootingStarAnimation(i, angle);
        newStar.style.animationName = 'shootingStar' + i;
    }

    starsSection.appendChild(newStar);
}

newStar.style.animationDuration = (Math.random() * 20 + 20) + 's'; //stjärnfall varar mellan 20 och 40 sekunder