const searchButton = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Adding event listeners to the page

searchButton.addEventListener('click', getMealList);
//mealList.addEventListener('click', getRecipe);

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