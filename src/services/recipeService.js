const recipeModel = require('../models/recipeModel');

const createRecipe = async (recipe) => {
  const createdRecipe = recipeModel.createRecipe(recipe);

  return createdRecipe;
};

const verifyFields = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  // const exists = await usersModel.getUserByEmail(email);

  // if (exists) return response.status(409).json({ message: 'Email already registered' });

  next();
};

module.exports = {
  createRecipe,
  verifyFields,
};
