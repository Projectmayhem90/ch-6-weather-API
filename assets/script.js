


var searchBtn = document.getElementById("searchBtn");
var forecastEl = document.getElementById("forecasts");

function convertSearch() {
    var input = document.getElementById("input").value.trim();

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+ input + "&limit=1&appid=4c68348ebef06f62bb4687ae1b234b42")
    .then((response) => response.json())
    .then(function(data) {
        var lon = data[0].lon;
        var lat = data[0].lat;
        var city = data[0].name;
        getWeatherData(lon, lat, city);
        saveHistory(input);
    })
};

function getWeatherData(lon, lat, city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=4c68348ebef06f62bb4687ae1b234b42")
    .then((response) => response.json())
    .then(function(data) {
        console.log(data);
        currentForecast(data, city);
        weekOut(data);
    })
}

function currentDate(data, city) {
    var date = new Date((data.current.dt*1000)-(data.timezone_offset*1000))
    var icon = data.current.weather[0].icon;

    var currentLocationEl = document.getElementById("currentLocation");
    var currentDateEl = document.getElementById("currentDate");
    var currentIconEl = document.getElementById("currentIcon");
    var currentTempEl = document.getElementById("currentTemp");
    var currentHumidityEl = document.getElementById("currentHumidity");
    var currentWindEl = document.getElementById("currentWind");

    currentLocationyEl.textContent = city;
    currentDayEl.textContent = data.toLocaleDateString("en-Us");
    currentIconEl.setAttribute("src","https://openweathermap.org/img/wn/"+ icon + "@2xpng");
    currentHumidityEl.textContent = data.current.humidty;
    currentWindEl.textContent = data.current.wind_speed;
}

function weekOut(data) {

    for (var i = 1; i < 6; i++) {
        var date = new Date((data.daily[i].dt*1000)-(data.timezone_offset*1000));
        var icon = data.daily[i].weather[0].icon;

    var dateEl = document.getElementById("data" + i);
    var iconEl = document.getElementById("icon" + i);
    var tempEl = document.getElementById("temp" + i);
    var humidityEl = document.getElementById("humidity" + i);
    var windEl = document.getElementById("humidity" + i);
    var windEl = document.getElementById("wind" + i);

    dateEl.textContent = data.toLocaleDateString("en-US");
    iconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ icon + "@2.png");
    tempEl.textContent = "Temp: " + data.daily[i].temp.day + "°F";
    humidityEl.textContent = "Humidity: " + data.daily[i].humidty + "%";
    windEl.textContent = "Wind Speed: " + data.daily[i].wind_speed + "mph";

    forecastEl.classList.remoce("hidden");
    }
}

function saveHistory(input) {
    console.log("Save History Success");
    localStorage.setItem("history", input)
}

searchBtn.addEventListener("click", convertSearch);