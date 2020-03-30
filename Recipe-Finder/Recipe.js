
var searchBtn = document.getElementById("search-btn");
var recipeResult = document.getElementById("recipe-result");


// fridge content from local storage
var localIngredients = JSON.parse(localStorage.getItem("Ingredients"));

if (localIngredients === null) {
    alert("please add items to your fridge via the fridge content tab");
};

function RenderElements() {
    
    //$("#listIngredients").empty();

    for(i = 0; i < localIngredients.length; i++) {
        var ingredient = localIngredients[i];

        //creates necessary elements
        var li = $("<li>");
        var div = $("<div>");
        var a = $("<a>");

        // adds necessary classes and ids
        a.addClass("secondary-content waves-effect waves-light addSearchBtn");
        li.addClass("collection-item");
        a.attr("id", ingredient);

        // sets text of elements
        a.text("Add to search");
        div.text(ingredient);

        // appends elements
         div.append(a);
         li.append(div);

        // sets text to input
        $("#listIngredients").append(li);
    }
}

// quick references for elements
var searchBtn = document.getElementById("search-btn");
var recipeResult = document.getElementById("recipe-result");

//call renderElements
$(document).on("click", ".addSearchBtn", function() { 
    var searchValue = document.getElementById("recipe-search").value;
    searchValue.value = searchValue.value + "sddsf";
})



// when the search button is clicked

searchBtn.addEventListener("click", function () {
    $("#recipe-result").empty();
    var searchValue = document.getElementById("recipe-search").value;
    getRecipe(searchValue)
    console.log("search value: " + searchValue);
})
    //key one: 6700e89d83964e28b700a8b597b8123c
    //key two: 316e271bb0b045a7a09d60ffc6d3c9e7

function getRecipe(searchValue) {
    $.ajax({
        type: "GET",
        url: "https://api.spoonacular.com/recipes/complexSearch?query=" + searchValue + "&addRecipeInformation=True&fillIngredients=True&number=8&apiKey=316e271bb0b045a7a09d60ffc6d3c9e7",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < data.results.length; i++) {

                console.log(data.results[i]);
                //create div to store results
                var resultDiv = document.createElement("div");
                resultDiv.classList.add("result-div-styles", "row")

                // call title
                var recipeInfoDiv = document.createElement("div")
                recipeInfoDiv.classList.add("col", 's10')

                var recipeTitleEl = document.createElement("h5");
                var resultTitle = data.results[i].title;
                recipeTitleEl.append(resultTitle)
                recipeInfoDiv.append(recipeTitleEl)

                //create div for subheadings
                var subheadingDiv = document.createElement("div");
                subheadingDiv.classList.add("subheadingdiv-style")
                recipeInfoDiv.append(subheadingDiv)


                //call prep time
                var resultPrepTime = data.results[i].preparationMinutes;
                var prepTimeEl = document.createElement("p");
                prepTimeEl.classList.add("text-preptime")
                prepTimeEl.append("Preparation time: " + resultPrepTime + " minutes ")
                subheadingDiv.append(prepTimeEl)

                //call cooking time
                var resultCookingTime = data.results[i].cookingMinutes;
                var cookingTimeEl = document.createElement("p");
                cookingTimeEl.classList.add("text-cookingtime")
                cookingTimeEl.append("Cooking time: " + resultCookingTime + " minutes ")
                subheadingDiv.append(cookingTimeEl)

                //call serving size 
                var resultServingSize = data.results[i].servings;
                var servingSizeEl = document.createElement("p");
                servingSizeEl.classList.add("text-servingsize")
                servingSizeEl.append("Serving Size: " + resultServingSize + " ")
                subheadingDiv.append(servingSizeEl)

                //call image
                var imgInfoDiv = document.createElement("div")
                imgInfoDiv.classList.add("col", 's2')

                var recipeImg = document.createElement("img")
                recipeImgLink = data.results[i].image;
                recipeClass = "." + data.results[i].id;
                recipeImg.classList.add(recipeClass, "recipeImgStyles");
                recipeImg.setAttribute('src', recipeImgLink)
                imgInfoDiv.append(recipeImg)


                //append 
                recipeResult.append(resultDiv)
                resultDiv.append(imgInfoDiv)
                resultDiv.append(recipeInfoDiv)


                //call ingredients
                var ingredientDiv = document.createElement("div");
                ingredientDiv.classList.add("ingredient-div-style")


                var ing = document.createElement("p")
                ing.textContent = "Ingredients: ";
                recipeInfoDiv.append(ing)


                for (j = 0; j < data.results[i].missedIngredients.length; j++) {
                    var ingredientName = data.results[i].missedIngredients[j].name
                    var ingredientAmount = data.results[i].missedIngredients[j].amount + " " + data.results[i].missedIngredients[j].unitShort

                    var ingredientEl = document.createElement("p");
                    ingredientEl.setAttribute("id", ingredientName)

                    ingredientEl.append(ingredientAmount + " " + ingredientName)
                    ingredientDiv.append(ingredientEl)
                    recipeInfoDiv.append(ingredientDiv)

                    //var localIngredients = JSON.parse(window.localStorage.getItem('Ingredients'));
                    for (l = 0; l < localIngredients.length; l++) {

                        if (ingredientName === localIngredients[l]) {
                            var ingName = document.getElementById(ingredientName)
                            console.log(ingName)
                            ingName.classList.add("hasIngredient")
                            console.log("have " + ingredientName)
                        } else {
                            console.log("dont have " + ingredientName)
                        }
                    }
                    

                }

                //recipe method button and unhide on click
                var recipeDiv = document.createElement("div");
                recipeDiv.classList.add("method-style")

                var showRecipeBtn = document.createElement("button");
                showRecipeBtn.classList.add("waves-effect",  "waves-light",  "btn", "btn-recipe")
                $(showRecipeBtn).attr("id", "button" + i);
                showRecipeBtn.textContent = "View Recipe";

                recipeDiv.append(showRecipeBtn)
                recipeResult.append(recipeDiv)



                //Get Recipe Method
                var instructionDiv = document.createElement("div")
                instructionDiv.classList.add("instruction-div-styles", "row", "hide")
                $(instructionDiv).attr("id", "button" + i + "method");
                recipeResult.append(instructionDiv)


                for (m = 0; m < data.results[i].analyzedInstructions[0].steps.length; m++) {
                    var instructP = document.createElement("p")

                    instructP.textContent = "step " + m + ": " + data.results[i].analyzedInstructions[0].steps[m].step
                    instructionDiv.append(instructP);
                    recipeDiv.append(instructionDiv);
                    
                }

                $(".btn-recipe").on("click", function() {
                    var btnId = document.getElementById(this.id + "method");
                        btnId.classList.remove("hide")

                })



            }

        }
    })
}
