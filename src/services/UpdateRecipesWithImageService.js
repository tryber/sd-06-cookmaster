const Recipes = require('../models/Recipes');

const SUCESS = 200;

const updateRecipesWithImage = async (id) => {
  const recipes = await Recipes.updateRecipesWithImage(id);

  return {
    status: SUCESS,
    recipesResponse: recipes, 
  };
};

module.exports = updateRecipesWithImage;