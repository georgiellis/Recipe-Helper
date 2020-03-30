// api key: 36838fddf630f5d0a43b9234ea3eb50a

// on click

$("#findRestaurants").on("click", function(event) {
    event.preventDefault();
    // runs findRestaurants function
    findLocation();
});

// find location function

function findLocation() {

     //first ajax call to get city ID from Zomato
     var search = $("#restaurants").val().trim();
     var queryURL = "https://developers.zomato.com/api/v2.1/cities?q=" + search;
     $.ajax({
         url: queryURL,
         method: "GET",
         headers: {"user-key": "36838fddf630f5d0a43b9234ea3eb50a"},
         dataType: "json",
     })
     .then(function(response){
        console.log(response);
        console.log(response.location_suggestions[0].id);
    
        //second call to get the actual info that I want using Zomato ID
        var searchID = response.location_suggestions[0].id;
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + searchID;
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {"user-key": "36838fddf630f5d0a43b9234ea3eb50a"},
            dataType: "json",
        })
        .then(function (response2) {

            //Code Sam moved
          // create for loop to loop through each of the restaurants while i is less than the number of results or 10
          for (i = 0; i < response2.restaurants.length || i < 10 ; i++) {
            console.log(response2.restaurants[i].restaurant);
            var name = response2.restaurants[i].restaurant.name;
            var location = response2.restaurants[i].restaurant.location.address;
            var pics = response2.restaurants[i].restaurant.photos;
            var cuisine = response2.restaurants[i].restaurant.cuisines;
            var userRating = response2.restaurants[i].restaurant.user_rating.aggregate_rating;
            var phoneNumber = response2.restaurants[i].restaurant.phone_numbers;
  
                // appending the results to the table
                $("#restaurant-table > tbody").append(
                "<tr><td id='table-name'>" + name +
                "</td><td id='table-location'>" + location +
                "</td><td id='table-cuisine'>" + cuisine +
                "</td><td id='table-rating'>" + userRating +
                "</td><td id='table-phone'>" + phoneNumber +
                "</td></tr>");
            }
    
        });
    });
}

var getRestaurant = function() {

    // creating variables for the 2 text fields
    var locationInput = $("#restaurants").val();
    
    // test
    console.log(locationInput);

    // clearing the text field on submit
    $("#location-input").val("");

    var queryURL = "https://developers.zomato.com/api/v2.1/cities?q="+ locationInput;

    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {"user-key": "36838fddf630f5d0a43b9234ea3eb50a"},
        dataType: "json",
    })
    .then(function(response){
        console.log(response);

    });
};


$("#findRestaurants").on("click", function(event) {

    event.preventDefault();
    getRestaurant();


});

findLocation();
