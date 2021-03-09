const Recipes = require('../models/Recipes');

const statusError = 400;

const validation = (obj) => {
  if (!obj.name || !obj.ingredients || !obj.preparation) {
    const error = { err: { message: 'Invalid entries. Try again.' }, code: statusError };
    return error;
  }
};

const createRecipes = async (obj) => {
  const answer = await Recipes.createRecipes(obj);
  return answer;
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const answer = validation({ name, ingredients, preparation });
  if (answer) return res.status(answer.code).json(answer.err);
  next();
};

module.exports = {
  createRecipes,
  validateRecipe,
};
