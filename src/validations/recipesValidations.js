const {
  objError,
} = require('../useful/funcsObjUseful');

const {
  isBlank,
} = require('../useful/funcsBollQuestions');

const { findByIdAndIdUser } = require('../models/mongoDbRequests');

const connectionRecipes = 'recipes';

const validationRecipeUserAllowed = async (idRecipe, userId) => {
  const typeError = 401;

  try {
    const recipe = await findByIdAndIdUser(connectionRecipes, idRecipe, userId);
    if (!recipe) {
      return objError('Recipe does not belong to the user', typeError);
    }
    return null;
  } catch {
    return objError('Recipe does not belong to the user', typeError);
  }
};

const validationRecipesKeysExists = (body) => {
  const typeError = 400;

  const { name, ingredients, preparation } = body;

  switch (true) {
    case isBlank(name):
    case isBlank(ingredients):
    case isBlank(preparation):
      return objError('Invalid entries. Try again.', typeError);
    default: return null;
  }  
};

module.exports = {
  validationRecipesKeysExists,
  validationRecipeUserAllowed,
};