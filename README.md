# Project-1-Homebuddy-App
<img src="https://res.cloudinary.com/dcm18vy74/image/upload/v1652983440/Project1-Images/Screen_Shot_2022-05-19_at_1.03.49_PM_skuzei.png">

### Developed by:
Mason McCoy,
Roya Jamshidpour,
Catie O'Connor,
Ian Sieg

## Description
Everyone wants an evening in, whether it be by themselves or with friends. With the Homebuddy app you can make an evening at home just as memorable as an evening out! This app is for the homebody who needs a little bit of inspiration for their food and entertainmet. 
With Homebuddy you can select a specific recipe to make, or search with a general search-term. Both call the Edemam API which gets those food options based on keyword and card options render onto the page. When you click on a recipe, a modal pops up with the ingredients, a link to the full recipe, and a 'Select' and 'Save' button. Clicking the 'Save' button saves that recipe into local storage and it will then render on your "Saved Recipes" page, which can be navigated to via the link on the navbar. Upon clicking the 'Select' button, that recipe is saved into session storage and the user is moved to the next section to select their randomly-generated cocktail. The user can also click 'Select' for their chosen cocktail and that cocktail is saved to session storage. 
 After selecting a cocktail for their evening in, the user can choose a movie to enjoy that evening! They can search for your movie-of-choice by genre as well as title or keyword. This section uses the Movie Database API. Upon clicking a genre or searching for a movie name/keyword the movie API is called and cards with the movie image, description, and score are rendered onto the page. The user has the choice to select a movie and, upon clicking 'Select' that movie is saved into session storage and the user is brought to the final screen. 
 On this final screen the user's food, cocktail, and movie selections are displayed as cards and their evening in with Homebuddy can begin!

 ## Languages and Frameworks Utilized
 Web APIs, jQuery, Bulma CSS, Edamam Recipe API, Complete Movie Database API, Cocktail DB API

 ## User Story 
As a user I want to supply a search term and be able to view a collection of applicable recipes.
While viewing recipes, I would like to see the name of the dish, the type of cuisine, an estimated prep time, a list of ingredients, and a link to the recipe instructions. I would also like to be able to save recipes to reference later.

After selecting a recipe, I would like to be able to select a cocktail to have with my meal.
After selecting my cocktail I would like to choose a movie to watch during my meal. I would like to browse by genre, as well as searching directly.

Once I have selected all of the components of my evening in, I would like to be presented with a final screen that displays all of my choices.

## Here is a link to the Homebuddy app!
<a href="https://masonmccoy.github.io/meal-prepper/">https://masonmccoy.github.io/meal-prepper/