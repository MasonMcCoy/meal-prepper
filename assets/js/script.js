// homepage
var homepageButton = document.getElementById('homepage-button')
var homepage = document.getElementById('homepage')
document.addEventListener('click' , removeHides)

function removeHides() {
    var header = document.querySelector('.hero')
    var search = document.querySelector('.field')
    header.classList.remove('hide')
    search.classList.remove('hide')
    homepage.classList.add('hide')
//    DOES NOT REMOVE MOVIES HIDE YET
}

// API Credentials
var appID = config.app_id;
var appKey = config.app_key;

var searchBttn = $("#search-button");
var contentContainer = $("#content");

// Recipe API
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
    // Clears any existing grid that may already exist
    contentContainer.text("");

    for (var i = 0; i < recipesResponse.length; i++) {
        var recipeCard = $("<section>").attr("class", "card");
        
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

// Movie API

// Movie API Variables
let tmdbKey = 'e86784e99f17cd9b8e35fcc922379812'
let genreURL =  'https://api.themoviedb.org/3/genre/movie/list?api_key=' + tmdbKey + '&language=en-US'
let discoverURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbKey + '&language=en-US&page=1' + '&with_genres='
let imageBaseURL = 'http://image.tmdb.org/t/p/'

const filmBaseURL = 'https://api.sampleapis.com/movies/';

let dropList = document.querySelector('.dropdown')
let genreList = document.querySelector('.dropdown-content')
let genreQuery;

dropList.addEventListener('click', function() {
    dropList.classList.toggle('is-active')
})

genreList.addEventListener('click', getFilm);

function getFilm(e) {

    console.log(e)
    // let genrePick = e.explicitOriginalTarget.firstChild.data

    let genrePick = e.explicitOriginalTarget.firstChild.data
    console.log(e)

    fetch(genreURL)
        .then(resp => resp.json())
        .then(data => codifyGenre(data))
    
    function codifyGenre(data) {
        for (let i = 0; i < data.genres.length; i++) {
            if (genrePick === data.genres[i].name) {
                genreQuery = data.genres[i].id
                }
            }
        fetch(discoverURL + genreQuery)
            .then(resp => resp.json())
            .then(data => displayFilms(data))
            function displayFilms(data) {
                console.log(data)
                console.log(genreQuery)
                console.log(discoverURL+genreQuery)
                for (let i = 0; i < 8; i++) {
                    let filmDiv = document.createElement('section')
                    filmDiv.classList.add('card', 'film-section')
                    let filmTitleEl = document.createElement('h2')
                    let filmScoreEl = document.createElement('h2')
                    let filmPicEl = document.createElement('img')
                    let filmInfoEl = document.createElement('p')
                    filmTitleEl.innerHTML = '<strong>' + data.results[i].title + '</strong>';
                    filmScoreEl.innerHTML = '<strong>' + data.results[i].vote_average + '</strong>'  + '/10'
                    filmPicEl.setAttribute('src', imageBaseURL + '/w185/' + data.results[i].poster_path)
                    filmInfoEl.textContent = data.results[i].overview
                    filmDiv.appendChild(filmTitleEl)
                    filmDiv.appendChild(filmScoreEl)
                    filmDiv.appendChild(filmPicEl)
                    filmDiv.appendChild(filmInfoEl)
                    contentContainer.append(filmDiv)
                }
            }
        }

    }



//poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"

function showModal(event) {
    if (event.target.tagName != "IMG"){
        return
    }
    console.log(event.target);
}

searchBttn.on("click", getRecipes);
contentContainer.on("click", showModal);

let configurationURL = 'https://api.themoviedb.org/3/configuration?api_key=' + tmdbKey
fetch(configurationURL)
    .then(resp => resp.json())
    .then(data => console.log(data))
