const { createRecipe } = require('../model/recipesModel');

const validateCreateRecipe = async (recipe, id) => {
  const { name, ingredients, preparation } = recipe;
  
  const recipeCreated = await createRecipe(name, ingredients, preparation, id);

  return recipeCreated;
};

module.exports = { validateCreateRecipe };