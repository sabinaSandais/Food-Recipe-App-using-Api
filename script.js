const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");

// Function to fetch data from the API and display the results
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=19bde2bf&app_key=e66d79d01e5f7b88d13643b3f5f2861c&to=15`
    );
    const response = await data.json();
    recipeContainer.innerHTML = "";
    response.hits.forEach((hit) => {
      //recipe div for each recipe
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
   
      const image = document.createElement("img");
      image.src = hit.recipe.image;
      image.alt = "image";

      const heading = document.createElement("h3");
      heading.textContent = hit.recipe.label;

      const calories = document.createElement("p");
      calories.textContent = "Calories: " + hit.recipe.calories.toFixed(2);

      const type = document.createElement("p");
      type.textContent = "Type: " + hit.recipe.dietLabels;
      // Created the anchor element
      const anchor = document.createElement("a");

      // Set the attributes of the anchor element
      anchor.setAttribute("class", "view-recipe");
      anchor.setAttribute("href", hit.recipe.url);
      anchor.setAttribute("target", "_blank");
      anchor.textContent = "View Recipe";

      recipeDiv.appendChild(image);
      recipeDiv.appendChild(heading);
      recipeDiv.appendChild(calories);
      recipeDiv.appendChild(type);
      recipeDiv.appendChild(anchor);

    

      recipeContainer.appendChild(recipeDiv);

      });
  } catch (error) {
  
      recipeContainer.innerHTML = `<h2>Error in Fetching Recipes!</h2>`;
   }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Please enter a search term</h2>`;
    return;
  }
  fetchRecipes(searchInput);
});