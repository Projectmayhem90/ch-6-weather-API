// capture the weather API key and root urls
const apiKey = "4c68348ebef06f62bb4687ae1b234b42";
var searchLocationRoot = 'https://api.openweathermap.org/geo/1.0/direct?q='
var requestUrlRoot = 'https://api.openweathermap.org/data/2.5/forecast?lat=';

// open empty variables to be stored with info from functions later
var cityData = {};
var fetchData = {};
var selectedCity = [];

// fetch the city's long & lat data after user search and then run through weather API for current and 5-day forecast
function getWeather() {
    var searchLocationUrl = searchLocationRoot + selectedCity + '&limit=5&appid=' + apiKey;

    fetch(searchLocationUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            cityData = data;

            var lat = data[0].lat
            var lon = data[0].lon

            var requestUrl = requestUrlRoot + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    fetchData = data;

                    renderWeather();
                })
        })
}

// capture the value of the saved city in the sidebar if clicked and fetch the weather from api
function getLocation() {
    $(document).ready(function () {
        $("[data-id]").parent().click(function () {
            selectedCity = $(this).children().data("id");
            selectedCity = selectedCity.replace(" ", "").trim();
            localStorage.setItem("selectedCity", JSON.stringify(selectedCity));

            getWeather();
        });
    });
}

// run the fetch weather api from the last selected and stored in localStorage city
function lastSelection() {
    selectedCity = JSON.parse(localStorage.getItem("selectedCity"));
    getWeather();
}

lastSelection();
getLocation();