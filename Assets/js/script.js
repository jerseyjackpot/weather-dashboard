$(document).ready(function(){
    $("#search-btn").on("click", function(){
        var citySearch = $("#city-search").val();
    });

    $("#city-search").val(" ");
    var citySearch = (function(){
        weatherSearch(citySearch);
    });

    $(".history").on("click", "li", function() {
        weatherSearch($(this).text());
    });

    function makeList (text){
        var li = $("<li>").addClass("city-history").text(text);
        $(".history").append(li);
    }

    function weatherSearch (citySearch){
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q="
            + citySearch + "APPID=dc644253a490b31ad20affc0c135f009",
            dataType: "json",
            success: function(data) {
                if(history.indexOf(citySearch) === -1) {
                    history.push(citySearch);
                    window.localStorage.setItem("history", JSON.stringify(history));
                    makeList(citySearch);
                }
                $("#forecast").empty();

                //start here
                //name, weather conditions, the temperature, the humidity, 
                // the wind speed, and the UV index 
                //functiontogetforecast(citySearch)
                //functiontogetUVindex(data.object.object)
            } 
        })
    }

    //functionforforecast ajax call
    // function to get UV index(lat, lon)
    // get current history
         // var history = parse json(window.localStorage.getItem("history")).
         //if(history.length > 0) {
             //weatherSearch(history[history.length-1])
         //}

         //for(var.... history.length) {
             //makeList(history[i])
         //}

})
// WHEN I search for a city

// THEN I am presented with current and future conditions for that city 
// and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, 
// an icon representation of weather conditions, the temperature, the humidity, 
// the wind speed, and the UV index 


// WHEN I view the UV index
// THEN I am presented with a color that indicates 
// whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, 
// an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast

