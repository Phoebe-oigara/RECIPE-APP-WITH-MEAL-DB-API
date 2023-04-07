const searchButton = getElementbyID('search-button');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Adding event listeners to the page

searchButton.addEventListener('click', getMealList);
mealList.addEventListener('click', getRecipe);
