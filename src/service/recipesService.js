const Recipe = require('../models/recipesModel');

const NOT_FOUND = 404;

async function create(name, ingredients, preparation, userId) {
  const result = await Recipe.createRecipes(name, ingredients, preparation, userId);
  return result;
}

async function getAll() {
  const result = await Recipe.getAll();
  return result;
}

async function findById(id) {
  const result = await Recipe.findById(id);
  if (!result) {
    return {
      error: {
        code: NOT_FOUND,
        message: 'recipe not found',
      },
    };
  }

  return result;
}

async function update(newDataFromRecipe) {
  const result = await Recipe.updateRecipes(newDataFromRecipe);
  if (!result) {
    return {
      error: {
        message: 'Recipe not updated',
        code: NOT_FOUND,
      },
    };
  }

  return result;
}

async function insertRecipeImage(recipeId, imageUrl) {
  const result = await Recipe.insertRecipeImage(recipeId, imageUrl);
  if (!result) {
    return {
      error: {
        message: 'Recipe not updated',
        code: NOT_FOUND,
      },
    };
  }

  return result;
}

async function remove(id) {
  const result = await Recipe.removeRecipe(id);
  if (!result) {
    return {
      error: {
        message: 'Recipe not removed',
        code: 404,
      },
    };
  }
  return result;
}

module.exports = {
  create,
  getAll,
  findById,
  update,
  insertRecipeImage,
  remove,
};
