// api key: 36838fddf630f5d0a43b9234ea3eb50a
// search function

// to fetch location id

function cityID(cityName) {
  var apiKey = "36838fddf630f5d0a43b9234ea3eb50a";
  var cityName = document.getElementById("city-name").value;
  var queryIDUrl =
    "https://developers.zomato.com/api/v2.1/locations?query=" + cityName;

  $.ajax({
    url: queryIDUrl,
    headers: { "user-key": apiKey },
    dataType: "json",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  //creating html for restaurant results

  //creating div to store 5 or so restaurant results

  //creating tags for the result information we want to display

  //
}

// function to fetch restaurants based of location id

function findRestaurant() {
  var locationID = response.location_suggestions[0].entity_id;
  var queryUrl =
    "https://developers.zomato.com/api/v2.1/search?query=" + locationID;

  $.ajax({
    url: queryUrl,
    headers: { "user-key": apiKey },
    dataType: "json",
    method: "GET"
  }).then(function(response) {});
}

//grab city data from submit button function

$("#add-city").on("click", function(event) {
  event.preventDefault();

  var cityInput = $("#city-name").val();

  cityID(cityInput);
});

// calling cityID function

cityID();
