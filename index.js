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

var starsSection = document.getElementById('stars');
var starsSectionHeight = starsSection.getBoundingClientRect().height;
var starsSectionWidth = starsSection.getBoundingClientRect().width;

for (var i = 0; i < 200; i++) {
    var newStar = document.createElement('div');
    newStar.className = 'star';
    newStar.style.top = Math.random() * starsSectionHeight + 'px';
    newStar.style.left = Math.random() * starsSectionWidth + 'px';
    newStar.style.animationDelay = Math.random() * 5 + 's'; // starta blinkningen vid en slumpmässig tidpunkt
    newStar.style.animationDuration = Math.random() * 5 + 's'; // blinka i en slumpmässig hastighet
    starsSection.appendChild(newStar);
}