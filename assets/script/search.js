// capture relevant html elements to variables for further rendering/interactivity
var sideBarEl = $(".sidebar");
var sideBarLinkEl = document.querySelector("#sidebar-link-city");
var searchBarEl = document.querySelector("#search-container");

// create empty array to capture cities searched by user
var searchCities = [];

// render the cities that the user has searched for and are in their localStorage
function renderCities() {
    var cityNodeEl = document.createElement('div');
    var cityNodeText = document.createElement('div');

    cityNodeEl.setAttribute('class', 'sidebar-link');
    cityNodeEl.setAttribute('id', 'sidebar-link-city');
    cityNodeText.setAttribute('id', 'saved-city')
    cityNodeText.setAttribute('data-id', searchCity)

    for (var i = 0; i < searchCities.length; i++) {
        var searchCity = searchCities[i];
        cityNodeText.textContent = searchCity;

        sideBarEl.append(cityNodeEl);
        cityNodeEl.append(cityNodeText);
    }
}

// unhide the search input bar after user selects search from sidebar
$("#search-button").on("click", function () {
    var searchBarEl = document.querySelector('.search-bar');
    var hideEl = document.querySelector('.hide');

    if (searchBarEl.style.display !== "none") {
        searchBarEl.style.display = "none";
        hideEl.style.display = "none";
    } else {
        searchBarEl.style.display = "block";
        hideEl.style.display = "flex";
        searchBarEl.focus();
    }
})

// when the user hits enter, add the city that was searched for into localStorage and fetch weather data and render
searchBarEl.addEventListener("keypress", function (event) {
    var sideBarLinkEl = document.querySelector("#sidebar-link-city");

    if (event.key == 'Enter') {
        var searchBarEl = document.querySelector('.search-bar');
        var searchCity = $(".search-bar").val();

        if (searchCity === '') {
            return;
        }

        searchCities.push(searchCity);
        selectedCity = searchCity;
        selectedCity = selectedCity.replace(" ", "").trim();
        storeCities();
        renderCities();
        searchBarEl.value = "";

        // getWeather();
        location.reload();
    }
})

// clear localStorage and reload page if user selects 'clear' from sidebar menu
$(document).ready(function () {
    $("#clear-button").on("click", function () {
        localStorage.clear();
        location.reload();
    })
})

// function to store searched cities that show in sidebar menu as well as last selected/searched for city
function storeCities() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("searchCities", JSON.stringify(searchCities));
    localStorage.setItem("selectedCity", JSON.stringify(selectedCity));

}

// when the user hits the search icon, add the city that was searched for into localStorage and fetch weather data and render
$(document).ready(function () {
    $(".search-icon").on("click", function () {
        var searchBarEl = document.querySelector('.search-bar');
        var searchCity = $(".search-bar").val();
        // var searchCityState = 'Ohio';
        searchCities.push(searchCity);
        selectedCity = searchCity;
        selectedCity = selectedCity.replace(" ", "").trim();
        storeCities();
        renderCities();
        searchBarEl.value = "";

        // getWeather();
        location.reload();
    })
})

// This function is being called below and will run when the page loads.
function init() {
    // Get stored cities from localStorage
    var storedSearchCities = JSON.parse(localStorage.getItem("searchCities"));
    selectedCity = JSON.parse(localStorage.getItem("selectedCity"));

    // If cities were retrieved from localStorage, update the todos array to it
    if (storedSearchCities !== null) {
        searchCities = storedSearchCities;
    }
    // render the cities to the page
    for (var i = 0; i < searchCities.length; i++) {
        var searchCity = searchCities[i];
        var cityNodeEl = document.createElement('div');
        var cityNodeText = document.createElement('div');

        cityNodeEl.setAttribute('class', 'sidebar-link');
        cityNodeEl.setAttribute('id', 'sidebar-link-city');
        cityNodeText.setAttribute('id', 'saved-city')
        cityNodeText.setAttribute('data-id', searchCity)

        cityNodeText.textContent = searchCity;

        sideBarEl.append(cityNodeEl);
        cityNodeEl.append(cityNodeText);
    }
}


init();