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
        url: "https://api.spoonacular.com/recipes/search?query=" + searchValue + "&number=6&apiKey=6700e89d83964e28b700a8b597b8123c",
        dataType: "json",
        success: function (data) {
            var result = data.results[0].title
            recipeResult.append(result)

            console.log(result);

        }
    })
}
