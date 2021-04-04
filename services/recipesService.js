const {
  insertRecipe,
  getAllRecipes,
} = require('../models/recipesModels');

const {
  validateName,
} = require('../middleware/validates/validate');

const postBarRecipe = async (recipe) => {
  console.log(recipe);
  validateName(recipe.name);
  validateName(recipe.preparation);
  validateName(recipe.ingredients);
  const result = await insertRecipe(recipe);
  return result;
};

const getBar = async () => {
  const result = await getAllRecipes();
  return result;
};

module.exports = {
  getBar,
  postBarRecipe,
};