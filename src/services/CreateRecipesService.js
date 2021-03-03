const Recipes = require('../models/Recipes');

const SUCESS = 201;

const createRecipes = async (name, ingredients, preparation, userId) => {
const recipeId = await Recipes.createRecipes(name, ingredients, preparation, userId);

  return {
    status: SUCESS,
    mensage: {
      recipe: {
        name,
        ingredients,
        preparation,
        userId,
        _id: recipeId,
      },
    },
  };
};

module.exports = createRecipes;
