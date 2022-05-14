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

let tmdbKey = 'e86784e99f17cd9b8e35fcc922379812'
let genreURL =  'https://api.themoviedb.org/3/genre/movie/list?api_key=' + tmdbKey + '&language=en-US'
let discoverURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbKey + '&language=en-US&page=1' + '&with_genres='
let imageBaseURL = 'http://image.tmdb.org/t/p/'

searchBttn.on("click", getResponse);

const filmBaseURL = 'https://api.sampleapis.com/movies/';

let dropList = document.querySelector('.dropdown')
let genreList = document.querySelector('.dropdown-content')
let filmOptionsEl = document.getElementById('film-options')
let genreQuery;

dropList.addEventListener('click', function() {
    dropList.classList.toggle('is-active')
})

genreList.addEventListener('click', getFilm);

function getFilm(e) {
    let genrePick = e.explicitOriginalTarget.firstChild.data
    fetch(genreURL)
        .then(resp => resp.json())
        .then(data => codifyGenre(data))
    
    function codifyGenre(data) {
        for (let i = 0; i < data.genres.length; i++) {
            if (genrePick == data.genres[i].name) {
                genreQuery = data.genres[i].id
                }
            }
        }

        fetch(discoverURL + genreQuery)
                    .then(resp => resp.json())
                    .then(data => displayFilms(data))
                        function displayFilms(data) {
                            console.log(data)
                            console.log(genreQuery)
                            console.log(discoverURL+genreQuery)
                            //why does it just looooove sonic?
                            for (let i = 0; i < 5; i++) {
                                let filmTitleEl = document.createElement('h2')
                                let filmScoreEl = document.createElement('h2')
                                let filmPicEl = document.createElement('img')
                                let filmInfoEl = document.createElement('p')
                                filmTitleEl.innerHTML = '<strong>' + data.results[i].title + '</strong>';
                                filmScoreEl.innerHTML = '<strong>' + data.results[i].vote_average + '/10' + '</strong>'
                                filmPicEl.setAttribute('src', imageBaseURL + '/w185/' + data.results[i].poster_path)
                                filmInfoEl.textContent = data.results[i].overview
                                filmOptionsEl.appendChild(filmTitleEl)
                                filmOptionsEl.appendChild(filmScoreEl)
                                filmOptionsEl.appendChild(filmPicEl)
                                filmOptionsEl.appendChild(filmInfoEl)
                            }
                        }
    }
    //poster sizes 0: "w92" 1: "w154" 2: "w185" 3: "w342" 4: "w500" 5: "w780" 6: "original"

    let configurationURL = 'https://api.themoviedb.org/3/configuration?api_key=' + tmdbKey
    fetch(configurationURL)
        .then(resp => resp.json())
        .then(data => console.log(data))