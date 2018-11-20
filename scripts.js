function loadDoc() {
    var url = "";

    // Valitsee kaupungin URL tiedot

    if (document.getElementById('city').value == "Helsinki") {
        url = "http://api.openweathermap.org/data/2.5/forecast?q=helsinki&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
        var alasveto = document.getElementById('city');
        alasveto.selectedIndex = 0;
    } else if (document.getElementById('city').value == "Stockholm") {
        url = "http://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
        var alasveto = document.getElementById('city');
        alasveto.selectedIndex = 0;
    } else if (document.getElementById('city').value == "Rome") {
        url = "http://api.openweathermap.org/data/2.5/forecast?q=rome&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
        var alasveto = document.getElementById('city');
        alasveto.selectedIndex = 0;
    } else if (document.getElementById('city').value == "New York") {
        url = "http://api.openweathermap.org/data/2.5/forecast?id=5128581&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
        var alasveto = document.getElementById('city');
        alasveto.selectedIndex = 0;
    } else if (document.getElementById("citysearch").value != "") {
        // käsittelee tekstihaun
        var txt = document.getElementById("citysearch").value;
        //console.log(txt);
        url = "http://api.openweathermap.org/data/2.5/forecast?q=" + txt + "&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
    }



    var jsonObj, kaupunki, saa, deg, direction, error = "";

    // Hakee ja käsittelee API yhteyden. Antaa virheen jos yhteydessä on virhe ja haku ei tuota tulosta. 
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("content").innerHTML = this.responseText;
            jsonObj = JSON.parse(xhttp.responseText);
            console.log(jsonObj);
            error = document.getElementById('error');
            error.setAttribute("style", "display: none;");
        } else if (this.readyState == 4 && this.status == 404) {
            error = document.getElementById('error');
            error.setAttribute("style", "display: block;");
            error.innerHTML = "Error trying to find city name. You might need underscore in two part name like: new_york.";
        }

        // Lisää kaupungin nimen tekstiin
        kaupunki = document.getElementById('kaupunki');
        kaupunki.innerHTML = "Weather in the city of " + jsonObj.city.name;

        saa = document.getElementById('saatiedot');
        // muuttaa tuulen suunnan sanalliseksi -- korjattu ja muokattu (NNE -> North-northeast) verkosta löytynyt listaus
        deg = jsonObj.list[0].wind.deg;

        if (deg > 11.25 && deg < 33.75) {
            direction = "North-northeast";
        } else if (deg > 33.75 && deg < 56.25) {
            direction = "Northeast";
        } else if (deg > 56.25 && deg < 78.75) {
            direction = "East-northeast";
        } else if (deg > 78.75 && deg < 101.25) {
            direction = "East";
        } else if (deg > 101.25 && deg < 123.75) {
            direction = "East-southeast";
        } else if (deg > 123.75 && deg < 146.25) {
            direction = "Southeast";
        } else if (deg > 146.25 && deg < 168.75) {
            direction = "South-southeast";
        } else if (deg > 168.75 && deg < 191.25) {
            direction = "South";
        } else if (deg > 191.25 && deg < 213.75) {
            direction = "South-southwest";
        } else if (deg > 213.75 && deg < 236.25) {
            direction = "Southwest";
        } else if (deg > 236.25 && deg < 258.75) {
            direction = "West-southwest";
        } else if (deg > 258.75 && deg < 281.25) {
            direction = "West";
        } else if (deg > 281.25 && deg < 303.75) {
            direction = "West-northwest";
        } else if (deg > 303.75 && deg < 326.25) {
            direction = "Northwest";
        } else if (deg > 326.25 && deg < 348.75) {
            direction = "North North West";
        } else {
            direction = "North";
        }
        // Kirjoittaa kaikki tiedot sivulle
        saa.innerHTML = "<li><img src='http://openweathermap.org/img/w/" + jsonObj.list[0].weather[0].icon + ".png'></li><br><li> Description: " + jsonObj.list[0].weather[0].description + "</li><br><li> Temperature: " + jsonObj.list[0].main.temp + "&#8451 </li><br><li>Clouds: " + jsonObj.list[0].clouds.all + "% </li><br><li>Wind: " + jsonObj.list[0].wind.speed + " m/s</li><br><li>Wind direction: " + direction + "</li><br><li>Humidity: " + jsonObj.list[0].main.humidity + "%</li><br></ul>";

        //Yön aikana eri sääikonin taustaväri

        var hour = (new Date()).getHours();
        //console.log(hour);
        if (hour < 6 || hour > 18) {
            var night = document.getElementById('saatiedot').firstChild;
            night.setAttribute("style", "background-color: lightslategray;");
        } else {
            var night = document.getElementById('saatiedot').firstChild;
            night.setAttribute("style", "background-color: lightskyblue;");
        }

    }
    xhttp.open("GET", url, true);
    xhttp.send();
    // en tajua kuinka functiot() saisi toimimaan loadDoc(xhttp) sisällä/kanssa. Haluaisin tietoa tästä.
};