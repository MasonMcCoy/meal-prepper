// API Credentials
var appID = config.app_id;
var appKey = config.app_key;

var searchBttn = $("#search-button");

// Captures user input as query term for API call
function getResponse(event) {
    event.preventDefault();

    var searchTerm = $("#search-term").val();

    var baseURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
    var call = baseURL + searchTerm + "&app_id=" + appID + "&app_key=" + appKey;

    $.ajax({url: call, success: function(response) {
        console.log(response);

        for (var i = 0; i < response.hits.length; i++) {
            // Lists names for 20 Recipes (more if we want to paginate)
            console.log(response.hits[i].recipe.label);

            for (var j = 0; j < response.hits[i].recipe.ingredientLines.length; j++) {
                // Lists ingredients (there is a more granular way to do this, should we find it necessary)
                console.log(response.hits[i].recipe.ingredientLines[j]);
            }

            // REMOVE THIS WHEN WE AREN'T LOGGING TO CONSOLE
            console.log("-----");
        }
    }})
}

console.log("A change was made!");

searchBttn.on("click", getResponse);