const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');
const verifyToken = require('../data/verifyToken');
const { invalidEntry, invalidToken } = require('../utils/errorsLibrary');

const createRecipe = async (token, newRecipe) => {
  const { name, ingredients, preparation } = newRecipe;
  if (!name || !ingredients || !preparation) throw invalidEntry;

  const payload = verifyToken(token);
  if (payload.message === 'jwt malformed') throw invalidToken;

  const { data: { email, password } } = payload;
  const isUserValid = await usersModel.authenticateUser(email, password);
  if (!isUserValid) throw invalidToken;
  const { _id: userId } = isUserValid;

  const recipeFromUser = await recipesModel.createRecipe(newRecipe);
  return { ...recipeFromUser, userId };
};

module.exports = {
  createRecipe,
};
