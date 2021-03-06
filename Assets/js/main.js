// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and 
// that city is added to the search history

function makeCityList(citySearchList) {
  $("#city-list").empty();
  var keys = Object.keys(citySearchList);
  for (var i = 0; i < keys.length; i++) {
    var cityListButton = $("<button>");
    cityListButton.addClass("list-group-item list-group-item-action");
    var splitStr = keys[i].toLowerCase().split(" ");
    for (var j = 0; j < splitStr.length; j++) {
      splitStr[j] =
        splitStr[j].charAt(0).toUpperCase() + splitStr[j].substring(1);
    }
    var titleCasedCity = splitStr.join(" ");
    cityListButton.text(titleCasedCity);
    $("#city-list").append(cityListButton);
  }
}
function populateCityWeather(city, citySearchList) {
  console.log(city);
  makeCityList(citySearchList);
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
    city;
  var queryURLB =
    "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
    city;
  var latitude;
  var longitude;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // Create weather variable
    .then(function (weather) {

      var nowMoment = moment();
      var displayMoment = $("<h3>");
      $("#city-name").empty();
      $("#city-name").append(
        displayMoment.text("(" + nowMoment.format("M/D/YYYY") + ")")
      );
      var cityName = $("<h3>").text(weather.name);
      $("#city-name").prepend(cityName);
      var weatherIcon = $("<img>");
      weatherIcon.attr(
        "src",
        "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png"
      );
      $("#current-icon").empty();
      $("#current-icon").append(weatherIcon);
      $("#current-temp").text("Temperature: " + weather.main.temp + " °F");
      $("#current-humidity").text("Humidity: " + weather.main.humidity + "%");
      $("#current-wind").text("Wind Speed: " + weather.wind.speed + " MPH");
      latitude = weather.coord.lat;
      longitude = weather.coord.lon;
      var queryURLC =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?&units=imperial&appid=dc644253a490b31ad20affc0c135f009&q=" +
        "&lat=" +
        latitude +
        "&lon=" +
        longitude;
      $.ajax({
        url: queryURLC,
        method: "GET"
        // Store all of the retrieved data inside of an object called "uvIndex"
      }).then(function (uvIndex) {
        var uvIndexDisplay = $("<button>");
        uvIndexDisplay.addClass("#current-uv");
        uvIndexDisplay.attr("class", "btn btn-primary");
        $("#current-uv").text("UV Index: ");
        $("#current-uv").append(uvIndexDisplay.text(uvIndex[0].value));
        // console.log(uvIndex[0].value);

        // make different colored buttons for the UV index based on number
        if ((uvIndex[0].value) < 3) {
          $(uvIndexDisplay).css("background-color", "green");
        }
        else if ((uvIndex[0].value) < 6) {
          $(uvIndexDisplay).css("background-color", "yellow");
          $(uvIndexDisplay).css("color", "black");
        }
        else if ((uvIndex[0].value) < 8) {
          $(uvIndexDisplay).css("background-color", "orange");
        }
        else if ((uvIndex[0].value) < 11) {
          $(uvIndexDisplay).css("background-color", "red");
        }
        else {
          $(uvIndexDisplay).css("background-color", "purple");
        }

        $.ajax({
          url: queryURLB,
          method: "GET"
          // Store all of the retrieved data inside of an object called "forecast"
        }).then(function (forecast) {

          for (var i = 6; i < forecast.list.length; i += 8) {
            // 6, 14, 22, 30, 38
            var forecastDate = $("<h5>");
            var forecastPosition = (i + 2) / 8;

            $("#forecast-date" + forecastPosition).empty();
            $("#forecast-date" + forecastPosition).append(
              forecastDate.text(nowMoment.add(1, "days").format("M/D/YYYY"))
            );
            var forecastIcon = $("<img>");
            forecastIcon.attr(
              "src",
              "https://openweathermap.org/img/w/" +
              forecast.list[i].weather[0].icon +
              ".png"
            );
            $("#forecast-icon" + forecastPosition).empty();
            $("#forecast-icon" + forecastPosition).append(forecastIcon);
            // console.log(forecast.list[i].weather[0].icon);
            $("#forecast-temp" + forecastPosition).text(
              "Temp: " + forecast.list[i].main.temp + " °F"
            );
            $("#forecast-humidity" + forecastPosition).text(
              "Humidity: " + forecast.list[i].main.humidity + "%"
            );
            $(".forecast").attr(
              "style",
              "background-color:dodgerblue; color:white"
            );
          }
        });
      });
    });
  $("#clear-button").on("click", function (event) {
    $("#city-list").empty();
    localStorage.clear();


  });
}
$(document).ready(function () {
  var citySearchListString = localStorage.getItem("citySearchList");
  var citySearchList = JSON.parse(citySearchListString);
  if (citySearchList == null) {
    citySearchList = {};
    $("#current-weather").hide();
    $("#forecast-weather").hide();
  }
  makeCityList(citySearchList);
  var cityArr = Object.keys(citySearchList);
  // console.log(cityArr);
  var lastCity = cityArr.pop();
  // console.log(lastCity);
  if (lastCity) {
    populateCityWeather(lastCity, citySearchList);
    $("#current-weather").show();
    $("#forecast-weather").show();
  };

 
  $("#search-button").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input")
      .val()
      .trim()
      .toLowerCase();
    if (city != "") {
      //Check to see if there is any text entered
      citySearchList[city] = true;
      localStorage.setItem("citySearchList", JSON.stringify(citySearchList));
      populateCityWeather(city, citySearchList);
      $("#current-weather").show();
      $("#forecast-weather").show();
    }
  });
  $("#city-list").on("click", "button", function (event) {
    event.preventDefault();
    var city = $(this).text();
    populateCityWeather(city, citySearchList);
    $("#current-weather").show();
    $("#forecast-weather").show();
  });
})