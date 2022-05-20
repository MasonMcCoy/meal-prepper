// homepage
var homepageButton = document.getElementById('homepage-button');
var homepage = document.getElementById('homepage');
homepageButton.addEventListener('click', removeHides);
var header = document.querySelector('.hero');
var movieSection = document.querySelector('.section');
var backToHomepage = document.getElementById('back-to-homepage-btn');
var placeholderButton = document.getElementById('placeholder');

// clears movie info to make room for final page
backToHomepage.addEventListener('click', refreshPage);

// goes back to homepage and clears cache
function refreshPage() {
  location.reload();
}
// When homepage button is pressed, content appears on page
function removeHides() {
  var header = document.querySelector('.hero');
  var search = document.querySelector('.food-field');
  header.classList.remove('hide');
  header.classList.add('header-food');
  search.classList.remove('hide');
  homepage.classList.add('hide');
  // Main content box is initially hidden, but revealed once we leave the landing page
  contentContainer.css('display', 'grid');
}

// API Credentials
var appID = '4238a1ff';
var appKey = 'c7d57c2318b4a47dee8151c302c2a3cb';

// DOM Variables
var searchLabel = $('#search-label');
var searchInput = $('#search-term');
var searchBttn = $('#search-button');
var contentContainer = $('#content');
var foodSearch = $('.food-field');
var savedRecipes = $('#saved-recipes');

// Recipe API
// Captures user input as query term for API call
function getRecipes(event) {
  event.preventDefault();

  var searchTerm = searchInput.val();

  var baseURL = 'https://api.edamam.com/api/recipes/v2?type=public&q=';
  var call = baseURL + searchTerm + '&app_id=' + appID + '&app_key=' + appKey;

  console.log(call);

  $.ajax({
    url: call,
    success: function (response) {
      console.log(response);

      var recipes = response.hits;
      renderRecipes(recipes);
    },
  });
}

function renderRecipes(recipesResponse) {
  // Clears any existing grid that may already exist
  contentContainer.text('');

  buildModal();

  for (var i = 0; i < recipesResponse.length; i++) {
    var recipeCard = $('<section>').addClass('card');

    // Create data attributes
    recipeCard.attr('data-title', recipesResponse[i].recipe.label);
    recipeCard.attr('data-image', recipesResponse[i].recipe.images.REGULAR.url);
    recipeCard.attr('data-cuisine', recipesResponse[i].recipe.cuisineType[0]);
    recipeCard.attr('data-prep', recipesResponse[i].recipe.totalTime);
    recipeCard.attr('data-url', recipesResponse[i].recipe.url);
    recipeCard.attr(
      'data-ingredients',
      recipesResponse[i].recipe.ingredientLines
    );

    // CARD TITLE
    var recipeName = $('<div>').addClass('card-header');

    // Recipe Name
    recipeName.append(
      $('<div>')
        .addClass('card-header-title')
        .text(recipesResponse[i].recipe.label)
    );
    console.log(recipesResponse[i].recipe.label);

    // CARD IMAGE
    var recipeImg = $('<figure>')
      .addClass('image is-4by3')
      .append(
        $('<img>').attr('src', recipesResponse[i].recipe.images.REGULAR.url)
      );

    // CARD FOOTER
    var recipeData = $('<div>').addClass('card-footer');

    // Cuisine Type
    recipeData.append(
      $('<div>')
        .addClass('card-footer-item')
        .text(recipesResponse[i].recipe.cuisineType[0])
    );
    console.log(recipesResponse[i].recipe.cuisineType[0]);

    // Prep Time
    if (recipesResponse[i].recipe.totalTime === 0 ) {
        recipeData.append(
            $('<div>')
            .addClass('card-footer-item')
            .text("Quick prep!")
        )
    } else {
        recipeData.append(
            $('<div>')
            .addClass('card-footer-item')
            .text("Ready in " + recipesResponse[i].recipe.totalTime + " minutes")
        )
    }

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
    console.log('-----');
  }
}

// Movie API===========================================================================================================

// Movie API Variables
const tmdbKey = 'e86784e99f17cd9b8e35fcc922379812';
let genreURL =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=' +
  tmdbKey +
  '&language=en-US';
let discoverURL =
  'https://api.themoviedb.org/3/discover/movie?api_key=' +
  tmdbKey +
  '&language=en-US' +
  '&with_genres=';
let imageBaseURL = 'http://image.tmdb.org/t/p/';
let filmSearchURL =
  ' https://api.themoviedb.org/3/search/movie?api_key=' +
  tmdbKey +
  '&language=en-US&page=1&query=';

let filmSearchEl = document.getElementById('film-search');
let genreQuery;

// Creates film search field and button

function filmSearch() {
  // Removes form elements used for recipe search
  searchLabel.text('What would you like to watch?');
  searchInput.css('display', 'none');
  searchBttn.css('display', 'none');

  // Closes open modal
  var modal = $('#modal');
  modal.css('display', 'none');

  // Clears recipe cards out of content container
  contentContainer.text('');

  //hide cocktail button & label
  cocktailBtnEl.classList.add('hide');
  cocktailLabelEl.classList.add('hide');

  let filmSearchForm = document.createElement('form');
  let description = document.createElement('label');
  let filmSearchDiv = document.createElement('div');
  let filmSearchLabel = document.createElement('label');
  let filmSearchInput = document.createElement('input');
  let filmSearchBtn = document.createElement('button');

  filmSearchForm.classList.add('field');
  description.classList.add('label');
  filmSearchDiv.classList.add('control');
  filmSearchLabel.classList.add('label');
  filmSearchInput.classList.add('input', 'is-large');
  filmSearchBtn.classList.add('button');

  filmSearchInput.setAttribute('type', 'text');
  filmSearchInput.setAttribute('placeholder', 'i.e. Inherent Vice');
  filmSearchInput.setAttribute('id', 'film-search-term');
  filmSearchBtn.setAttribute('type', 'submit');
  filmSearchBtn.innerHTML = 'Search';

  filmSearchEl.appendChild(filmSearchForm);
  filmSearchForm.appendChild(description);
  filmSearchForm.appendChild(filmSearchDiv);
  filmSearchDiv.appendChild(filmSearchLabel);
  filmSearchDiv.appendChild(filmSearchInput);
  filmSearchForm.appendChild(filmSearchBtn);

  description.innerHTML = 'Search for a specific movie or by genre';

  filmSearchForm.addEventListener('click', queryFilm);
}

//Queries film api for search term, displays films if search term returns results
function queryFilm(e) {
  e.preventDefault();
  let filmSearch = document.getElementById('film-search-term').value;

  fetch(filmSearchURL + filmSearch)
    .then((resp) => resp.json())
    .then((data) => displayFilms(data, e));
}

//Generates genre buttons based on api classifications
function genreButtons() {
  fetch(genreURL)
    .then((resp) => resp.json())
    .then((data) => genFilmBtns(data));

  function genFilmBtns(data) {
    // makes food info disappear
    foodSearch.text('');
    contentContainer.text('');
    // changes header image
    header.classList.remove('header-food');
    header.classList.add('header-movie');

    let genreDiv = document.createElement('div');
    genreDiv.classList.add('genre-buttons');
    filmSearchEl.append(genreDiv);
    for (var i = 0; i < data.genres.length; i++) {
      let genreBtn = document.createElement('button');
      // genreBtn.classList.add('genre-buttons')
      genreBtn.setAttribute('data-genre', data.genres[i].name);
      genreBtn.textContent = data.genres[i].name;
      genreDiv.appendChild(genreBtn);
    }
    let genreList = document.querySelector('.genre-buttons');

    genreList.addEventListener('click', getFilms);
  }
  let genreList = document.querySelector('.genre-buttons');

  genreList.addEventListener('click', getFilms);
}

//On click of genre button, searches discover API for films of that genre
function getFilms(e) {
  contentContainer.text('');

  let genrePick = e.target.attributes[0].textContent;

  fetch(genreURL)
    .then((resp) => resp.json())
    .then((data) => codifyGenre(data));

  function codifyGenre(data) {
    for (let i = 0; i < data.genres.length; i++) {
      if (genrePick === data.genres[i].name) {
        genreQuery = data.genres[i].id;
      }
    }
    //Randomizes page number of genre query return
    let randoNum = Math.floor(Math.random() * 380);
    fetch(discoverURL + genreQuery + '&page=' + randoNum)
      .then((resp) => resp.json())
      .then((data) => displayFilms(data));
  }
}

//poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"

function buildModal() {
  var modal = $('<div>').addClass('modal').attr('id', 'modal');

  var modalBackground = $('<div>').addClass('modal-background');

  var modalCard = $('<div>').addClass('modal-card');

  // Header and title
  var modalHead = $('<div>').addClass('modal-card-head');
  var modalTitle = $('<div>')
    .addClass('modal-card-title')
    .attr('id', 'recipe-title');

  // Body with content
  var modalBody = $('<div>')
    .addClass('modal-card-body')
    .attr('id', 'recipe-content');

  // Footer and buttons
  var modalFooter = $('<footer>').addClass('modal-card-foot');
  var saveBttn = $('<button>').text('Save').addClass('button');
  var selectBttn = $('<button>').text('Select').addClass('button');

  selectBttn.on('click', genreButtons);
  selectBttn.on('click', filmSearch);

  // Save recipe data
  saveBttn.on('click', saveRecipe);

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
    alert('No movie with that name');
    return;
  }
  contentContainer.text('');
  for (let i = 0; i < 16; i++) {
    let filmDiv = document.createElement('div'); //changed from section
    filmDiv.classList.add('card', 'film-section');
    let filmDivFace = document.createElement('div');
    filmDivFace.classList.add('film-face');
    let filmDivBody = document.createElement('div');
    filmDivBody.classList.add('film-body');

    let filmTitleEl = document.createElement('h2');
    let filmPicEl = document.createElement('img');
    let filmScoreEl = document.createElement('h2');
    let filmInfoEl = document.createElement('p');

    let filmSelectBtn = document.createElement('button');

    filmTitleEl.textContent = data.results[i].title;
    filmTitleEl.classList.add('film-title');
    filmPicEl.setAttribute(
      'src',
      imageBaseURL + '/w780/' + data.results[i].poster_path
    );
    let posterPath = imageBaseURL + '/w780/' + data.results[i].poster_path;
    filmScoreEl.innerHTML = data.results[i].vote_average + '/10';
    filmInfoEl.textContent = data.results[i].overview;

    filmSelectBtn.setAttribute('class', 'select-film');
    filmSelectBtn.setAttribute('data-title', data.results[i].title);
    filmSelectBtn.setAttribute('data-pic', posterPath);
    filmSelectBtn.setAttribute(
      'data-score',
      data.results[i].vote_average + '/10'
    );
    filmSelectBtn.setAttribute('data-info', data.results[i].overview);

    filmSelectBtn.innerHTML = 'Select';
    filmSelectBtn.addEventListener('click', selectFilm);

    filmDiv.appendChild(filmTitleEl);
    filmDivFace.appendChild(filmPicEl);
    filmDivBody.appendChild(filmScoreEl);
    filmDivBody.appendChild(filmInfoEl);
    filmDivBody.appendChild(filmSelectBtn);
    filmDiv.appendChild(filmDivFace);
    filmDiv.appendChild(filmDivBody);
    contentContainer.append(filmDiv);
  }
}

function selectFilm() {
  let filmObj = {
    title: this.dataset.title,
    pic: this.dataset.pic,
    score: this.dataset.score,
    info: this.dataset.info,
  };
  contentContainer.text('');
  sessionStorage.setItem('film', JSON.stringify(filmObj));
  finalPage();
}

//poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"==========================================================

function buildModal() {
  var modal = $('<div>').addClass('modal').attr('id', 'modal');

  var modalBackground = $('<div>').addClass('modal-background');

  var modalCard = $('<div>').addClass('modal-card');

  // Header and title
  var modalHead = $('<div>').addClass('modal-card-head');
  var modalTitle = $('<div>')
    .addClass('modal-card-title')
    .attr('id', 'recipe-title');

  // Body with content
  var modalBody = $('<div>')
    .addClass('modal-card-body')
    .attr('id', 'recipe-content');

  // Footer and buttons
  var modalFooter = $('<footer>').addClass('modal-card-foot');
  var saveBttn = $('<button>').text('Save').addClass('button');
  var selectBttn = $('<button>').text('Select').addClass('button');

  selectBttn.on('click', saveRecipeSession);
  selectBttn.on('click', getCocktailButton);

  // Save recipe data
  saveBttn.on('click', saveRecipe);

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

function updateModal(recipeCard) {
  // Modal elements
  var modRecipeName = $('#recipe-title');
  var modRecipeContent = $('#recipe-content');

  // Resets any existing data
  modRecipeName.text('');
  modRecipeContent.text('');

  // Updates modal elements with data from data attributes
  modRecipeName.text(recipeCard.dataset.title);

  modRecipeContent.append(
    $('<img>')
      .attr('src', recipeCard.dataset.image)
      .attr('id', 'recipe-card-img')
  );

  if (recipeCard.dataset.prep != 0) {
    modRecipeContent.append(
      $('<p>')
        .text('Prep Time: ' + recipeCard.dataset.prep + ' minutes')
        .attr('id', 'recipe-card-preptime')
    );
  }

  modRecipeContent.append($('<h3>').text('Ingredients'));

  var ingredArr = recipeCard.dataset.ingredients.split(',');

  for (var i = 0; i < ingredArr.length; i++) {
    modRecipeContent.append(
      $('<p>').text(ingredArr[i]).addClass('recipe-card-ingredient')
    );
  }

  // Link to recipe source with instructions
  modRecipeContent.append(
    $('<a>')
      .text('View Recipe')
      .attr('href', recipeCard.dataset.url)
      .attr('target', '_blank')
      .attr('id', 'recipe-card-link')
  );
}

function showModal(event) {
  // Clicking anywhere in the recipe card references the parent container
  var parentCon = event.target.parentNode.parentNode;

  // Only triggers modal on recipe card click
  if (parentCon.tagName != 'SECTION') {
    return;
  }

  // Updates modal with recipe card information
  updateModal(parentCon);

  var modal = $('#modal');

  // Display the modal
  modal.css('display', 'block');

  // Close modal when you click off of it
  window.onclick = function (event) {
    if (event.target.classList.contains('modal-background')) {
      modal.css('display', 'none');
    }
  };
}

// Saves a recipe to local storage
function saveRecipe() {
  var savedIngredients = [];

  // Stores ingredients in an array
  for (var i = 0; i < $('.recipe-card-ingredient').length; i++) {
    savedIngredients.push($('.recipe-card-ingredient')[i].innerHTML);
  }

  // Isolated numeric value
  var savedPrep = $('#recipe-card-preptime').text().split(' ');
  // Recipe object to be passed as value in local storage
  var recipeObj = {
    image: $('#recipe-card-img').attr('src'),
    preptime: savedPrep[2],
    ingredients: savedIngredients,
    url: $('#recipe-card-link').attr('href'),
  };

  localStorage.setItem($('#recipe-title').text(), JSON.stringify(recipeObj));
}

function saveRecipeSession() {
  var savedIngredients = [];

  // Stores ingredients in an array
  for (var i = 0; i < $('.recipe-card-ingredient').length; i++) {
    savedIngredients.push($('.recipe-card-ingredient')[i].innerHTML);
  }

  // Isolated numeric value
  var savedPrep = $('#recipe-card-preptime').text().split(' ');
  // Recipe object to be passed as value in local storage
  var recipeObj = {
    image: $('#recipe-card-img').attr('src'),
    preptime: savedPrep[2],
    ingredients: savedIngredients,
    url: $('#recipe-card-link').attr('href'),
  };
  sessionStorage.clear();
  sessionStorage.setItem($('#recipe-title').text(), JSON.stringify(recipeObj));
}

function renderSaved() {

contentContainer.text('');
filmSearchEl.style.display = 'none';
cocktailLabelEl.style.display = 'none';
cocktailBtnEl.style.display = "none";
  
for (var i = 0; i < localStorage.length; i++) {
  var savedObj = localStorage.getItem(localStorage.key(i));
  var parsedObj = JSON.parse(savedObj);

  var savedCard = $("<section>").addClass("card")
  .css("text-align", "center");

  var savedCard = $('<section>').addClass('card');

  // CARD TITLE
  var recipeName = $('<div>').addClass('card-header');


  // Recipe Name
  recipeName.append(
    $('<div>').addClass('card-header-title').text(localStorage.key(i))
  );

  // CARD IMAGE
  var recipeImg = $('<figure>')
  .addClass('image is-4by3')
  .append($('<img>').attr('src', parsedObj.image));

  // CARD FOOTER
  var recipeData = $('<div>').addClass('card-footer');

  // CARD BUTTON
  var urlLink = $("<a>").text("View Site")
  .attr("href", parsedObj.url)
  .attr("target", "_blank")
  .css("color", "white")
  .css("background-color", "rgb(173, 33, 14)")
  .css("padding", "5px")
  .css("border-radius", "5px")
  .css("position", "relative")
  .css("top", "-30px");
  
  savedCard.append(recipeName);
  savedCard.append(recipeImg);
  savedCard.append(urlLink);
  
  contentContainer.append(savedCard);
}       
}

searchBttn.on('click', getRecipes);

savedRecipes.on('click', renderSaved);

contentContainer.on('click', showModal);

//Saved recipe page
// ------- cocktail API ----------
//cocktail variables

var cocktailBtnEl = document.getElementById('cocktail-btn');
var cocktailLabelEl = document.getElementById('cocktail-label');

// function to show cocktail button & label
function getCocktailButton() {
  contentContainer.text('');
  foodSearch.text('');
  cocktailBtnEl.classList.remove('hide');

  cocktailLabelEl.classList.remove('hide');
  header.classList.remove('header-food')
  header.classList.add('header-cocktails')
}

//function to generate random cocktail
function getRandomCocktail() {
  var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log(data);
      displayRandomCocktail(data);
    });
}

//funciton to display random cocktail
function displayRandomCocktail(cocktail) {
  let cocktailDiv = document.createElement('section');
  cocktailDiv.classList.add('card', 'cocktail-card', 'cocktail-section');

  let cocktailDivFace = document.createElement('div');
  // cocktailDivFace.classList.add('film-face');
  let cocktailDivBody = document.createElement('div');
  // cocktailDivBody.classList.add('film-body');
  let cocktailSelectBtn = document.createElement('button');
  cocktailSelectBtn.classList.add('button');
  cocktailSelectBtn.innerText = 'Select';

  // Click select button on cocktail card to open film page
  cocktailSelectBtn.addEventListener('click', genreButtons);
  cocktailSelectBtn.addEventListener('click', filmSearch);

  //   function to save cocktail to local storage
  let cocktailString = JSON.stringify(cocktail);

  function saveCocktail() {
    sessionStorage.setItem('cocktail', cocktailString);
  }

  // Click select button to save cocktail to session storage
  cocktailSelectBtn.addEventListener('click', saveCocktail);

  let cocktailTitleEl = document.createElement('h2');
  let cocktailPicEl = document.createElement('img');
  let cocktailInfoEl = document.createElement('p');

  //   create li elements for each measurement and ingredient
  for (let i = 1; i < 16; i++) {
    //   stop loop when it gets to an ingredient that is null
    if (cocktail.drinks[0][`strIngredient${i}`] == null) {
      break;
    }

    let ingredient = document.createElement('ul');
    ingredient.innerHTML =
      cocktail.drinks[0][`strMeasure${i}`] +
      ': ' +
      cocktail.drinks[0][`strIngredient${i}`];
    cocktailDivBody.appendChild(ingredient);
  }

  cocktailTitleEl.innerHTML =
    '<strong>' + cocktail.drinks[0].strDrink + '</strong>';
  cocktailPicEl.setAttribute('src', cocktail.drinks[0].strDrinkThumb);
  cocktailPicEl.setAttribute('style', 'width:250px;height:250px;');
  cocktailInfoEl.textContent = cocktail.drinks[0].strInstructions;
  cocktailDivFace.appendChild(cocktailTitleEl);
  cocktailDivFace.appendChild(cocktailPicEl);
  cocktailDivBody.appendChild(cocktailInfoEl);
  cocktailDivBody.appendChild(cocktailSelectBtn);
  cocktailDiv.appendChild(cocktailDivFace);
  cocktailDiv.appendChild(cocktailDivBody);
  contentContainer.append(cocktailDiv);
}

//click button to run function to get random cocktail
cocktailBtnEl.addEventListener('click', getFourRandomCocktails);

function getFourRandomCocktails() {
  contentContainer.text('');
  for (var i = 0; i < 4; i++) {
    getRandomCocktail();
  }
}

function finalPage() {

    // clears out all existing content
    let contentCont = document.getElementById('content')
    contentCont.classList.add('hide')
    header.classList.remove('header-movie')
    header.classList.add('header-final')
    let filmSearch = document.querySelector('#film-search')
    filmSearch.classList.add('hide')
}

savedRecipes.on('click', savedRecipePage)
// savedRecipeBtn.addEventListener('click', renderRecipes(savedRecipes))
function savedRecipePage() {
    // clears existing header styles and content
    filmSearchEl.classList.add('hide')
    foodSearch.addClass('hide')
    header.classList.remove('header-food')
    header.classList.remove('header-movie')
    header.classList.remove('header-cocktails')
    header.classList.remove('header-final')
    header.classList.add('header-saved-recipes')
}
