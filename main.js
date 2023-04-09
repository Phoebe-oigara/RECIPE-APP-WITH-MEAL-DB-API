const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Adding event listeners to the page

searchButton.addEventListener('click', getMealList);
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      getMealList();
    }
  });
mealList.addEventListener('click', getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


//fetching the mealList from the MealDb API
function getMealList(){
    let searchText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
    .then(response => response.json())
    .then(fetchMeal)
}

//function to fetch the meals
function fetchMeal (data) {
let html = "";
if(data.meals){
    data.meals.forEach(meal => {
        html += `
        <div class="meal-item" data-id="${meal.idMeal}">
            <div class ="meal-img">
            <img src = "${meal.strMealThumb}" alt = "food picture">
        </div>
            <div class = "meal-name">
             <h3>${meal.strMeal}</h3>
                <a href = "#" class = "recipe-btn"> Get The Recipe</a>
            </div>
        </div>
        `;
    })
    mealList.classList.remove("notFound");
} else {
    html = "Apologies, our recipes don't include that meal";
    mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
}

//function to fetch the recipe of a meal
function getRecipe(event){
    event.preventDefault();
    if(event.target.classList.contains('recipe-btn')){
        let mealItem = event.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(resp => resp.json())
        .then(data => mealRecipeModal (data.meals));
    }
}

// Modal to display the fetched recipe
function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class = "recipe-title">${meal.strMeal}</h2>
          <p class = "recipe-category">${meal.strCategory}</p>
          <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
          </div>
        </div>
            <div class = "recipe-meal-img">
             <img src = "${meal.strMealThumb}" alt = "">
            </div>
    
    ` ;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}