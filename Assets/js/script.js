$(document).ready(function(){
    // event listener for search button
    $("#search-btn").on("click", function(){
        var citySearch = $("#city-search").val();
        console.log("button pressed");
        weatherSearch(citySearch);
    });


    $("#city-search").val(" ");
        var citySearch = (function(){
        weatherSearch(citySearch);
        console.log("condition hit");
    });
    var history = [];
    
    //creating search history items
    $(".history").on("click", "button", function() {
        weatherSearch($(this).text());
        console.log("history condition hit");
    });

    //adding elements to hold the history and adding history to that element
    function makeList (text){
        var button = $("<button>").addClass("#city-history").text(text);
        $(history).append(li);
        console.log("make list hit");
    }

    //ajax request to request forecast from api
    function weatherSearch (citySearch){
        console.log("search");
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q="
            + citySearch + "&APPID=dc644253a490b31ad20affc0c135f009",
            dataType: "json",
            success: function(data) {
                console.log(data);
                window.datajson = data;
                if(history.indexOf(citySearch) === -1) {
                    history.push(citySearch);
                    window.localStorage.setItem("history", JSON.stringify(history));
                    // makeList(citySearch);
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


// <!DOCTYPE html>
// <html lang="en">

// <head>
//   <meta charset="utf-8">
//   <title>Favorite Movies</title>
//   <style type="text/css">
//     button,
//     div,
//     form,
//     input {
//       margin: 10px;
//     }
//   </style>
// </head>

// <body>

//   <div class="container">
//     <h1>Movie Search</h1>

//      <!-- Rendered Buttons will get Dumped Here  -->
//     <div id="buttons-view"></div>

//     <form id="movie-form">
//       <label for="movie-input">Add a Movie, Yo!</label>
//       <input type="text" id="movie-input"><br>

//       <!-- Button triggers new movie to be added -->
//       <input id="add-movie" type="submit" value="Add a Movie, Yo!">
//     </form>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//     <script type="text/javascript">
//       // Initial array of movies
//       var movies = [];

//       // Generic function for capturing the movie name from the data-attribute
//       function alertMovieName(event) {
//         console.log(this);
//         console.log(event.target);
//         // YOUR CODE GOES HERE!!!
//         // $("div.specificClass").attr("data-movie-id")
//         // alert($(this).attr("data-name"));
//         alert($(event.target).attr("data-name"));
//       }

//       // Function for displaying movie data
//       function renderButtons() {
//         movies = JSON.parse(localStorage.getItem('movieHistory'));

//         // Deleting the movies prior to adding new movies
//         // (this is necessary otherwise we will have repeat buttons)
//         $("#buttons-view").empty();

//         // Looping through the array of movies
//         for (var i = 0; i < movies.length; i++) {

//           // Then dynamicaly generating buttons for each movie in the array
//           // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//           var a = $("<button>");
//           // Adding a class
//           a.addClass("movie");
//           // Added a data-attribute
//           a.attr("data-name", movies[i]);
//           // Provided the initial button text
//           a.text(movies[i]);
//           // Added the button to the HTML
//           $("#buttons-view").append(a);
//         }
//       }

//       // This function handles events where one button is clicked
//       $("#add-movie").on("click", function(event) {
//         event.preventDefault();

//         // This line grabs the input from the textbox
//         var movie = $("#movie-input").val().trim();

//         // The movie from the textbox is then added to our array
//         movies.push(movie);

//         localStorage.setItem('movieHistory', JSON.stringify(movies));

//         // Calling renderButtons which handles the processing of our movie array
//         renderButtons();
//       });

//       // Function for displaying the movie info
//       // We're adding a click event listener to all elements with the class "movie"
//       // We're adding the event listener to the document itself because it will
//       // work for dynamically generated elements
//       // $(".movies").on("click") will only add listeners to elements that are on the page at that time
//       $(document).on("click", ".movie", alertMovieName);

//       // Calling the renderButtons function to display the initial buttons
//       renderButtons();
//     </script>
//   </div>
// </body>

// </html>


