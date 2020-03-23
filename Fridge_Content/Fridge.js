//sets the ingredients array
var ingredients = [];

//checks if anything is locally stored
if (localStorage.getItem("Ingredients") !== null) {
    ingredients = JSON.parse(localStorage.getItem("Ingredients"));
};

// renders the elements
function RenderElements() {
    $("#listIngredients").empty();
    for(i = 0; i < ingredients.length; i++) {
        var ingredient = ingredients[i];
        //creates necessary elements
        var li = $("<li>");
        var div = $("<div>");
        var a = $("<a>");

        // adds necessary classes and ids
        a.addClass("secondary-content waves-effect waves-light removeBtn");
        li.addClass("collection-item");
        a.attr("id", ingredient);
        // sets text of elements
        a.text("Remove");
        div.text(ingredient);

        // appends elements
        div.append(a);
        li.append(div);

        // sets text to input
        $("#listIngredients").append(li);
    }
}

//when the add button is pushed
$("#ingredientsInput").on("click", function() {
    var ingredient = $("#ingredients").val();
    // if the ingredient is already in the array
    if(ingredients.indexOf(ingredient) !== -1) {
        //alert("") <---- need to use modal window
    } else {
        var ingredient = $("#ingredients").val();
        
        //resets the ingredient input
        $("#ingredients").val("");

        //adds ingredient to the array
        ingredients.push(ingredient);

        //stores the new array locally
        localStorage.setItem("Ingredients", JSON.stringify(ingredients));

        // renders elements
        RenderElements();
    }
});

$(document).on("click", ".removeBtn", function() {
    //removes from array
    var indexOfIngredient = ingredients.indexOf($(this).attr("id"));
    ingredients.splice(indexOfIngredient, 1);

    //stores the new array locally 
    localStorage.setItem("Ingredients", JSON.stringify(ingredients));

    //renders the array
    RenderElements();
});

RenderElements();