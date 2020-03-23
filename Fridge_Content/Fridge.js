var ingredients = ["Eggs", "Onions", "Chocolate"];

$("#ingredientsInput").on("click", function() {
    //creates necessary elements
    var li = $("<li>");
    var p = $("<p>");
    var div = $("<div>");
    var a = $("<a>");

    // adds necessary classes
    a.addClass("secondary-content waves-effect waves-light removeBtn");
    li.addClass("collection-item");
    // a.attr();

    // sets text of elements
    a.text("Remove");
    div.text($("#ingredients").val());

    // appends elements
    div.append(a);
    li.append(div);

    // sets text to input
    $("#listIngredients").append(li);
    $("#ingredients").val("");
});

$(document).on("click", ".removeBtn", function() {
    var div = $(this).parent();
    div.parent().remove();
});