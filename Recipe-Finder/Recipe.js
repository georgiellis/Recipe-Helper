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
                for (j = 0; j < data.results[i].missedIngredients.length; j++) {
                    var ingredientName = data.results[i].missedIngredients[j].name

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
