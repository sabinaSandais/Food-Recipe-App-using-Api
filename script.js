const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");

// Function to fetch data from the API
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=19bde2bf&app_key=e66d79d01e5f7b88d13643b3f5f2861c&to=15`
    );
    const response = await data.json();
    //Message for user to know that typed recipe is not available
    if (response.count === 0) {
      recipeContainer.innerHTML = `<h2>No Recipes Found!</h2>`;
      return;
    }
       //empty recipe container before displaying recipes
    recipeContainer.innerHTML = "";
        //data from json object
    response.hits.forEach((hit) => {
      const recipeData = {
        title: hit.recipe.label,
        calories: hit.recipe.calories,
        image: hit.recipe.image,
        url: hit.recipe.url,
        type: hit.recipe.dishType,
      };
      // Function to display results in HTML
      const recipeDisplay = (recipeData) => {
        const htmlStr = `
      <div class="recipe">
        <img src="${recipeData.image}" alt="image">
        <h3>${recipeData.title}</h3>
        <p>Calories: ${recipeData.calories.toFixed(2)}</p>
        <p>Type: ${recipeData.type}</p>
        <a href="${
          recipeData.url
        }" target="_blank" class="view-recipe">View Recipe</a>
      </div>;
      `;

        recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
      };

      recipeDisplay(recipeData);
    });
  } catch (error) {
    //network error
    recipeContainer.innerHTML = `<h2>Error in Fetching Recipes!</h2>`;
  }
};

//function for search button
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Please enter a search term</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});
