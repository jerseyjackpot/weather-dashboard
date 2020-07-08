$(document).ready(function(){
    // event listener for search button
    $("#search-btn").on("click", function(){
        var citySearch = $("#city-search").val();
        console.log("button pressed");
    });


    $("#city-search").val(" ");
        var citySearch = (function(){
        weatherSearch(citySearch);
        console.log("condition hit");
    });

    //creating search history items
    $(".history").on("click", "li", function() {
        weatherSearch($(this).text());
        console.log("history condition hit");
    });

    //adding elements to hold the history and adding history to that element
    function makeList (text){
        var li = $("<li>").addClass("city-history").text(text);
        $(".history").append(li);
        console.log("make list hit");
    }

    //ajax request to request forecast from api
    function weatherSearch (citySearch){
        $.ajax({
            type: "GET",
            url: "api.openweathermap.org/data/2.5/weather?q="
            + citySearch + "&appid=dc644253a490b31ad20affc0c135f009",
            dataType: "json",
            success: function(data) {
                if(history.indexOf(citySearch) === -1) {
                    history.push(citySearch);
                    window.localStorage.setItem("history", JSON.stringify(history));
                    makeList(citySearch);
                }

                $("#forecast").empty();
                console.log(data);

                //start here
                //name, weather conditions, the temperature, the humidity, 
                // the wind speed, and the UV index 
                // function getForecast(citySearch){
                //     function getUVindex(data.object.object)
                // }
                
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

