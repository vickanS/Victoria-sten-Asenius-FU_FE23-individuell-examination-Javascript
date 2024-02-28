document.getElementById('searchbtn').addEventListener('click', function(event)  { //.getElementById letar upp HTML-elementet med id 'searchbtn' .addEventListener lägger till en eventlyssnare 'click'
    event.preventDefault(); //förhindrar att sidan laddas om när man trycket på knappen.

    async function fetchData() { //definierar funktionen 'fetchdata' asynkront, Koden kan köras i bakgrunden av annan kod.
        let resp = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', { //denna rad säger till datorn att hänta den angivna URLn och vänta på svaret.
          method: 'GET', //GET förfrågan används för at hämta data från servern.
          headers: {'x-zocom': 'solaris-2ngXkR6S02ijFrTP', //ger ytterligare instruktioner om vad vi vill hämta från servern.
          'cache-control': 'no-cache' // vill bara ha den senaste datan direkt från servern.
        }
        });
      
        let data = await resp.json(); //omvandlar svaret till json format
        console.log(data.bodies); //denna raden skriver utarrayen med planeter i konsolen

        let searchValue = document.getElementById('searchfield').value; // denna rad hämtar värdet från EN planet i taget när jag söker på det.
        let filteredData = data.bodies.filter(function(body) { //Med denna rad skapas en array med bara den planeten jag har sökt på.
          return body.name.toLowerCase() === searchValue.toLowerCase(); //Om namnet på ett planetobjekt är samma som en planet jag skriver in i sökfältet så kommer returnsatsen returnera true det specifika arrayobjektet kommer visas. toLowerCase innebär att innebär att man gör strängen till små bokstäver anars kan de båda strängarna med samma värde betraktas som olika.
        });

        if (filteredData.length > 0) { //villkoret kontrollerar om det finns några element i filteredData-arrayen. Om det finns minst ett element, körs koden inuti måsvingarna.
            var planet = filteredData[0]; //antar att vi bara har ett matchande resultat
            console.log(planet); //Detta skriver ut planetobjektet till konsolen.
            document.getElementById('overlayheader').innerHTML = planet.name; //Här ändras innehållet i HTML-elementet med id 'overlayheader' till planetens namn.
            document.getElementById('overlayinfo').innerHTML = //Denna raden ändrar innehållet i HTML-elementet med id 'overlayinfo' till en sträng som innehåller en massa information om planeten.
          'Circumference: ' + planet.circumference + ' km, ' +
          'Description: ' + planet.desc + ', ' +
          'Distance from Sun: ' + planet.distance + ' km, ' +
          'Orbital Period: ' + planet.orbitalPeriod + ' days, ' +
          'Rotation: ' + planet.rotation + ' hours, ' +
          'Temperature: ' + planet.temp.day + '°C (day), ' + planet.temp.night + '°C (night)';
            document.getElementById('overlay').style.display = 'block'; // DEnna rad gör HTML-elementet med id 'overlay' synligt genom att ändra dess display-stil till 'block'.
          }
        console.log(filteredData); //arrayen med det filtrerade objektet skrivs ut i konsolen.
      }
      
      fetchData();
});

let closebutton = document.getElementById('close') //lägger till en eventlyssnare på knappen med Id 'close'

closebutton.addEventListener('click', function() { //lägger till en eventlyssnare 'click' på knappen med id close så att overlayrutan stängs när man trycker på den.
    var overlay = document.getElementById('overlay') //hämtar 'overlay'
    overlay.style.display = 'none'; //sätter overlay till display none, så att den stängs ner efter att man har tryckt på close knappen.

    var searchfield = document.getElementById('searchfield'); //hämtar 'searchfield'
    searchfield.value = ''; //sätter value till en tom sträng för att sökrutan ska tömmas när man har klickat på close knappen i overlayrutan.
});

var starsSection = document.getElementById('stars'); //hämtar elementet med Id 'stars'
var starsSectionHeight = starsSection.getBoundingClientRect().height; // getBoundingClientRect är en metod som returnerar ett objekt med information om storlek och position för ett element. starsSectionHeight och starsSectionWidth innehåller höjden och bredden på starsSection elementet.
var starsSectionWidth = starsSection.getBoundingClientRect().width;

for (var i = 0; i < 200; i++) { //en loop där i har värdet 0 och så länge i är mindre än 200 kommer loopen fortsätta att öka med 1.
    var newStar = document.createElement('div'); //slapar en div 
    newStar.className = 'star'; //och tilldelar den klassnamnet 'star'
    newStar.style.top = Math.random() * starsSectionHeight + 'px'; //newStar.style.top samt newStar.style.left placerar stjärnorna slumpmässigt på skärmen med Math.random * starsSectionHeight/starsSectionWidth.
    newStar.style.left = Math.random() * starsSectionWidth + 'px';
    newStar.style.animationDelay = Math.random() * 5 + 's'; //animationDelay definierar hur lång tid det tar innan animationen startar, I detta fall startar animationen slumpmässigt med en fördröjning på 0-5 sek. 
    newStar.style.animationDuration = Math.random() * 5 + 's'; //animationDuration definierar hur lång tid animationen kommer pågå, I detta fall pågår animationen mellan 0-5 sek.
    //detta leder till att alla stjärnorna blinkar i otakt.

    //denna kod skapar en stjärnfalls-animation.
    function createShootingStarAnimation(id, angle) {
        var styleSheet = document.styleSheets[0];
        var keyframes = `@keyframes shootingStar${id} {
            from { transform: translate(0, 0); }
            to { transform: translate(${Math.cos(angle) * starsSectionWidth}px, ${Math.sin(angle) * starsSectionHeight}px); }
          }`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }

    // Endast 5% av stjärnorna blir stjärnfall
    if (Math.random() < 0.02) {  //Math. random genererar ett slumpmässigt tal mellan 0-1, om Math.random är mindre än 0.02 går koden in i if satsen.
        var angle = Math.random() * (Math.PI / 3) + Math.PI / 3;
        createShootingStarAnimation(i, angle);
        newStar.style.animationName = 'shootingStar' + i;
    }

    starsSection.appendChild(newStar);
}

newStar.style.animationDuration = (Math.random() * 30 + 20) + 's'; //stjärnfall varar mellan 20 och 50 sekunder