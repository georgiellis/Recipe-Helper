var searchBtn = document.getElementById("search-btn");
var recipeResult = document.getElementById("recipe-result");

searchBtn.addEventListener("click", function () {
    var searchValue = document.getElementById("city-search").value;
    getRecipe(searchValue)
    console.log("search value: " + searchValue);
})

function getRecipe(searchValue) {
    $.ajax({
        type: "GET",
        url: "https://api.spoonacular.com/recipes/complexSearch?query=" + searchValue + "&addRecipeInformation=True&fillIngredients=True&number=2&apiKey=6700e89d83964e28b700a8b597b8123c",
        dataType: "json",
        success: function (data) {
            for (i = 0; i < data.results.length; i++) {
                //create div to store results
                var resultDiv = document.createElement("div");
                resultDiv.classList.add("result-div-styles", "row")

                // call title
                var recipeTitleEl = document.createElement("h5");
                var resultTitle = data.results[i].title;
                recipeTitleEl.append(resultTitle)

                //call prep time
                var resultPrepTime = data.results[i].preparationMinutes;
                var prepTimeEl = document.createElement("p");
                prepTimeEl.append("Preparation time: " + resultPrepTime + " minutes")

                //call cooking time
                var resultCookingTime = data.results[i].cookingMinutes;
                var cookingTimeEl = document.createElement("p");
                cookingTimeEl.append("Cooking time: " + resultCookingTime + " minutes")

                //call serving size 
                var resultServingSize = data.results[i].servings;
                var servingSizeEl = document.createElement("p");
                servingSizeEl.append("Serving Size: " + resultServingSize)

                //call image
                var recipeImg = document.createElement("img")
                recipeImgLink = data.results[i].image;
                recipeClass = "." + data.results[i].id;
                recipeImg.classList.add(recipeClass, "recipeImgStyles");
                recipeImg.setAttribute('src', recipeImgLink)


                //append 
                recipeResult.append(resultDiv)
                resultDiv.append(recipeImg)
                resultDiv.append(recipeTitleEl)
                resultDiv.append(cookingTimeEl)
                resultDiv.append(prepTimeEl)
                resultDiv.append(servingSizeEl)

                //call ingredients
                for (j = 0; j < data.results[i].missedIngredients.length; j++) {
                    var ingredientName = data.results[i].missedIngredients[j].name
                    var ingredientDiv = document.createElement("div");

                    var ingredientEl = document.createElement("p");
                    ingredientEl.append(ingredientName)
                    console.log(data.results[i].missedIngredients[j].name);

                    ingredientDiv.append(ingredientEl)
                    resultDiv.append(ingredientDiv)
                }

            }


        }
    })
}
