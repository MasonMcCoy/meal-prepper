// API Credentials
var appID = config.app_id;
var appKey = config.app_key;

var searchBttn = $("#search-button");
var contentContainer = $("#content");

// Captures user input as query term for API call
function getRecipes(event) {
    event.preventDefault();

    var searchTerm = $("#search-term").val();

    var baseURL = "https://api.edamam.com/api/recipes/v2?type=public&q=";
    var call = baseURL + searchTerm + "&app_id=" + appID + "&app_key=" + appKey;

    console.log(call); 

    $.ajax({url: call, success: function(response) {
        console.log(response);

        var recipes = response.hits;
        renderRecipes(recipes);
    }})
}

function renderRecipes(recipesResponse) {
    for (var i = 0; i < recipesResponse.length; i++) {
        var recipeCard = $("<div>").attr("class", "card recipe-card");
        
        // CARD TITLE
        var recipeName = $("<div>").attr("class", "card-hearder");
        
        // Recipe Name
        recipeName.append($("<div>").attr("class", "card-hearder-title").text(recipesResponse[i].recipe.label));
        console.log(recipesResponse[i].recipe.label);

        // CARD IMAGE
        var recipeImg = $("<div>").attr("class", "card-image");
        
        // Thumbnail
        recipeImg.append($("<figure>").attr("class", "image is-4by3")
        .append($("<img>").attr("src", recipesResponse[i].recipe.images.REGULAR.url)));
        console.log(recipesResponse[i].recipe.images.REGULAR.url);

        // CARD FOOTER
        var recipeData = $("<div>").attr("class", "card-footer");
        
        // Cuisine Type
        recipeData.append($("<div>").attr("class", "card-footer-item").text(recipesResponse[i].recipe.cuisineType[0]));
        console.log(recipesResponse[i].recipe.cuisineType[0]);

        // Prep Time
        recipeData.append($("<div>").attr("class", "card-footer-item").text(recipesResponse[i].recipe.totalTime));
        console.log(recipesResponse[i].recipe.totalTime);

        recipeCard.append(recipeName);
        recipeCard.append(recipeImg);
        recipeCard.append(recipeData);

        contentContainer.append(recipeCard);


        // Link to Recipe (On Modal)
        var recipeLink = recipesResponse[i].recipe.url;
        console.log(recipeLink);

        // Meal Type (Maybe used to filter?)
        var recipeMeal = recipesResponse[i].recipe.mealType[0];
        console.log(recipeMeal);

        for (var j = 0; j < recipesResponse[i].recipe.ingredientLines.length; j++) {
            // Ingredients
            console.log(recipesResponse[i].recipe.ingredientLines[j]);
        }

        // REMOVE THIS WHEN WE AREN'T LOGGING TO CONSOLE
        console.log("-----");
    }
}

// let map, infoWindow;

// function initMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -34.397, lng: 150.644 },
//     zoom: 6,
//   });
//   infoWindow = new google.maps.InfoWindow();

//     window.addEventListener("load", () => {
//         // Try HTML5 geolocation.
//         if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//             const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             };

//             infoWindow.setPosition(pos);
//             infoWindow.setContent("Location found.");
//             infoWindow.open(map);
//             map.setCenter(pos);
//             },
//             () => {
//             handleLocationError(true, infoWindow, map.getCenter());
//             }
//         );
//         } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//         }
//     });
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(
//     browserHasGeolocation
//       ? "Error: The Geolocation service failed."
//       : "Error: Your browser doesn't support geolocation."
//   );
//   infoWindow.open(map);
// }

// window.initMap = initMap;

searchBttn.on("click", getRecipes);

