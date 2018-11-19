function loadDoc() {
    var url = "";
    switch (document.getElementById('city').value) {
        case "Helsinki":
            url = "http://api.openweathermap.org/data/2.5/forecast?q=helsinki&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
            break;
        case "Stockholm":
            url = "http://api.openweathermap.org/data/2.5/forecast?q=stockholm&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
            break;
        case "Rome":
            url = "http://api.openweathermap.org/data/2.5/forecast?q=rome&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
            break;
        case "New York":
            url = "http://api.openweathermap.org/data/2.5/forecast?id=5128581&units=metric&mode=JSON&APPID=5daa5123bdf9afd22d8bab894348c332";
            break;
    }
    var jsonObj, kaupunki, saa, deg, direction = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // document.getElementById("content").innerHTML = this.responseText;
            jsonObj = JSON.parse(xhttp.responseText);
            console.log(jsonObj);

        }


        kaupunki = document.getElementById('kaupunki');
        kaupunki.innerHTML = "Weather in the city of " + jsonObj.city.name;

        saa = document.getElementById('saatiedot');

        deg = jsonObj.list[0].wind.deg;

        if (deg > 11.25 && deg < 33.75) {
            direction = "North North East";
        } else if (deg > 33.75 && deg < 56.25) {
            direction = "North East";
        } else if (deg > 56.25 && deg < 78.75) {
            direction = "East East North";
        } else if (deg > 78.75 && deg < 101.25) {
            direction = "East";
        } else if (deg > 101.25 && deg < 123.75) {
            direction = "East South East";
        } else if (deg > 123.75 && deg < 146.25) {
            direction = "South East";
        } else if (deg > 146.25 && deg < 168.75) {
            direction = "South South east";
        } else if (deg > 168.75 && deg < 191.25) {
            direction = "South";
        } else if (deg > 191.25 && deg < 213.75) {
            direction = "South South West";
        } else if (deg > 213.75 && deg < 236.25) {
            direction = "South West";
        } else if (deg > 236.25 && deg < 258.75) {
            direction = "West South West";
        } else if (deg > 258.75 && deg < 281.25) {
            direction = "West";
        } else if (deg > 281.25 && deg < 303.75) {
            direction = "West North West";
        } else if (deg > 303.75 && deg < 326.25) {
            direction = "North West";
        } else if (deg > 326.25 && deg < 348.75) {
            direction = "North North West";
        } else {
            direction = "North";
        }

        saa.innerHTML = "<li>" + jsonObj.list[0].weather[0].icon + "</li><br><li> Description: " + jsonObj.list[0].weather[0].description + "</li><br><li> Temperature: " + jsonObj.list[0].main.temp + "&#8451 </li><br><li>Wind: " + jsonObj.list[0].wind.speed + " m/s</li><br><li>Wind direction: " + direction + "</li></ul>";


    }
    xhttp.open("GET", url, true);
    xhttp.send();
};