// API Credentials
var appID = "4238a1ff";
var appKey = "c7d57c2318b4a47dee8151c302c2a3cb";

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


searchBttn.on("click", getResponse);

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

    window.addEventListener("load", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
            },
            () => {
            handleLocationError(true, infoWindow, map.getCenter());
            }
        );
        } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }
    });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;

console.log("A change was made!");

searchBttn.on("click", getResponse);

