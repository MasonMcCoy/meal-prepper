// homepage
var homepageButton = document.getElementById('homepage-button')
var homepage = document.getElementById('homepage')
homepageButton.addEventListener('click' , removeHides)

// When homepage button is pressed, content appears on page
function removeHides() {
    var header = document.querySelector('.hero');
    var search = document.querySelector('.field');
    var movieSection = document.querySelector('.section');
    header.classList.remove('hide');
    search.classList.remove('hide');
    homepage.classList.add('hide');
    // movieSection.classList.remove('hide');
//    DOES NOT REMOVE MOVIES HIDE YET
}

// API Credentials
var appID = "4238a1ff";
var appKey = "c7d57c2318b4a47dee8151c302c2a3cb";

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

    buildModal();

    for (var i = 0; i < recipesResponse.length; i++) {
        var recipeCard = $("<section>").addClass("card");
        
        // Create data attributes
        recipeCard.attr("data-title", recipesResponse[i].recipe.label);
        recipeCard.attr("data-image", recipesResponse[i].recipe.images.REGULAR.url);
        recipeCard.attr("data-cuisine", recipesResponse[i].recipe.cuisineType[0]);
        recipeCard.attr("data-prep", recipesResponse[i].recipe.totalTime);
        recipeCard.attr("data-url", recipesResponse[i].recipe.url);
        recipeCard.attr("data-ingredients", recipesResponse[i].recipe.ingredientLines);

        // CARD TITLE
        var recipeName = $("<div>").addClass("card-header");
        
        // Recipe Name
        recipeName.append($("<div>").addClass("card-header-title").text(recipesResponse[i].recipe.label));
        console.log(recipesResponse[i].recipe.label);

        // CARD IMAGE
        var recipeImg = $("<figure>").addClass("image is-4by3")
        .append($("<img>").attr("src", recipesResponse[i].recipe.images.REGULAR.url));

        // CARD FOOTER
        var recipeData = $("<div>").addClass("card-footer");
        
        // Cuisine Type
        recipeData.append($("<div>").addClass("card-footer-item").text(recipesResponse[i].recipe.cuisineType[0]));
        console.log(recipesResponse[i].recipe.cuisineType[0]);

        // Prep Time
        recipeData.append($("<div>").addClass("card-footer-item").text(recipesResponse[i].recipe.totalTime));
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
const tmdbKey = 'e86784e99f17cd9b8e35fcc922379812'
let genreURL =  'https://api.themoviedb.org/3/genre/movie/list?api_key=' + tmdbKey + '&language=en-US'
let discoverURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbKey + '&language=en-US' + '&with_genres='
let imageBaseURL = 'http://image.tmdb.org/t/p/'
let filmSearchURL = ' https://api.themoviedb.org/3/search/movie?api_key=' + tmdbKey + '&language=en-US&page=1&query='

let placeholderButton = document.getElementById('placeholder')
let filmSearchEl = document.getElementById('film-search')
let genreQuery;

placeholderButton.addEventListener('click', genreButtons)
placeholderButton.addEventListener('click', filmSrch)

function filmSrch() {
    let filmSearchForm = document.createElement('form')
    let filmSearchDiv = document.createElement('div')
    let filmSearchLabel = document.createElement('label')
    let filmSearchInput = document.createElement('input')
    let filmSearchBtn = document.createElement('button')
    filmSearchForm.classList.add('field')
    filmSearchDiv.classList.add('control')
    filmSearchLabel.classList.add('label')
    filmSearchInput.classList.add('input', 'is-large')
    filmSearchBtn.classList.add('button')
    filmSearchInput.setAttribute('type', 'text')
    filmSearchInput.setAttribute('placeholder', 'i.e. Inherent Vice')
    filmSearchInput.setAttribute('id', 'film-search-term')
    filmSearchBtn.setAttribute('type', 'button')
    filmSearchBtn.innerHTML = 'Search'

    filmSearchEl.appendChild(filmSearchForm)
    filmSearchForm.appendChild(filmSearchDiv)
    filmSearchDiv.appendChild(filmSearchLabel)
    filmSearchDiv.appendChild(filmSearchInput)
    filmSearchForm.appendChild(filmSearchBtn)

    filmSearchBtn.addEventListener('click', searchForFilm)
}

function searchForFilm() {
    let filmSearch = document.getElementById('film-search-term').value

    fetch (filmSearchURL + filmSearch)
        .then(resp => resp.json())
        .then(data => displayFilms(data))
}

function genreButtons() {
    fetch (genreURL)
        .then(resp => resp.json())
        .then(data => genFilmBtns(data))
    
    function genFilmBtns(data) {
        let genreDiv = document.createElement('div');
        genreDiv.classList.add('genre-buttons')
        filmSearchEl.append(genreDiv)
        for (var i = 0; i < data.genres.length; i++) {
            let genreBtn = document.createElement('button')
            // genreBtn.classList.add('genre-buttons')
            genreBtn.setAttribute('data-genre', data.genres[i].name)
            genreBtn.textContent = data.genres[i].name
            genreDiv.appendChild(genreBtn)
        }
        let genreList = document.querySelector('.genre-buttons')
        genreList.addEventListener('click', getFilms);
    }
}
function getFilms(e) {
    contentContainer.text("");
    let genrePick = e.target.attributes[0].textContent

    fetch(genreURL)
        .then(resp => resp.json())
        .then(data => codifyGenre(data))
    
    function codifyGenre(data) {
        for (let i = 0; i < data.genres.length; i++) {
            if (genrePick === data.genres[i].name) {
                genreQuery = data.genres[i].id
                }
            }
        let randoNum = Math.floor(Math.random() * 380)
        fetch(discoverURL + genreQuery + '&page=' + randoNum)
            .then(resp => resp.json())
            .then(data => displayFilms(data))
            
        }
    }
    
//poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"

function buildModal() {
    var modal = $("<div>").addClass("modal").attr("id", "modal");
    
    var modalBackground = $("<div>").addClass("modal-background");
    
    var modalCard = $("<div>").addClass("modal-card");
    
    // Header and title
    var modalHead = $("<div>").addClass("modal-card-head");
    var modalTitle = $("<div>").addClass("modal-card-title").attr("id", "recipe-title");

    // Body with content
    var modalBody = $("<div>").addClass("modal-card-body").attr("id", "recipe-content");
    
    // Footer and buttons
    var modalFooter = $("<footer>").addClass("modal-card-foot");
    var saveBttn = $("<button>").text("Save").addClass("button");
    var selectBttn = $("<button>").text("Select").addClass("button");

    selectBttn.on('click', genreButtons);
    selectBttn.on('click', filmSrch);

    modalHead.append(modalTitle);

    modalFooter.append(saveBttn);
    modalFooter.append(selectBttn);

    modalCard.append(modalHead);
    modalCard.append(modalBody);
    modalCard.append(modalFooter);

    modal.append(modalBackground);
    modal.append(modalCard);
    
    contentContainer.append(modal);
}

function displayFilms(data) {
    if (data.total_results == 0) {
        alert('No movie with that name')
        return;
    }
    console.log(data)
    contentContainer.text("");
    for (let i = 0; i < 16; i++) {
        let filmDiv = document.createElement('section')
        filmDiv.classList.add('card', 'film-section')
        let filmDivFace = document.createElement('div')
        filmDivFace.classList.add('film-face')
        let filmDivBody = document.createElement('div')
        filmDivBody.classList.add('film-body')
        
        let filmTitleEl = document.createElement('h2')
        let filmPicEl = document.createElement('img')
        let filmScoreEl = document.createElement('h2')
        let filmInfoEl = document.createElement('p')
        
        filmTitleEl.innerHTML = '<strong>' + data.results[i].title + '</strong>';
        filmPicEl.setAttribute('src', imageBaseURL + '/w342/' + data.results[i].poster_path)
        filmScoreEl.innerHTML = '<strong>' + data.results[i].vote_average + '</strong>'  + '/10'
        filmInfoEl.textContent = data.results[i].overview
        filmDivFace.appendChild(filmTitleEl)
        filmDivFace.appendChild(filmPicEl)
        filmDivBody.appendChild(filmScoreEl)
        filmDivBody.appendChild(filmInfoEl)
        filmDiv.appendChild(filmDivFace)
        filmDiv.appendChild(filmDivBody)
        contentContainer.append(filmDiv)
    }
}

//poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"

function updateModal(recipeCard) {
    // Modal elements
    var modRecipeName = $("#recipe-title");
    var modRecipeContent = $("#recipe-content");

    // Resets any existing data
    modRecipeName.text("");
    modRecipeContent.text("");

    // Updates modal elements with data from data attributes
    modRecipeName.text(recipeCard.dataset.title);

    modRecipeContent.append($("<img>").attr("src", recipeCard.dataset.image));

    modRecipeContent.append($("<h3>").text("Ingredients"));
    var ingredArr = recipeCard.dataset.ingredients.split(",");
    for (var i = 0; i < ingredArr.length; i++) {
        modRecipeContent.append($("<p>").text(ingredArr[i]));
    }

}

function showModal(event) {
    // Clicking anywhere in the recipe card references the parent container
    var parentCon = event.target.parentNode.parentNode;

    // Only triggers modal on recipe card click
    if (parentCon.tagName != "SECTION") {
        return
    }

    // Updates modal with recipe card information
    updateModal(parentCon);

    var modal = $("#modal");

    // Display the modal
    modal.css("display", "block");
  
    // Close modal when you click off of it
    window.onclick = function(event) {
        if (event.target.classList.contains("modal-background")) {
            modal.css("display", "none");
        }
    }
}

searchBttn.on("click", getRecipes);

contentContainer.on("click", showModal);