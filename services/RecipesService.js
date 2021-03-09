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

const listRecipes = async () => {
  const answer = await Recipes.listRecipes();
  return answer;
};

const findById = async (id) => {
  try {
    const answer = await Recipes.findById(id);
    return answer;
  } catch (e) {
    const error = { message: 'recipe not found' };
    return error;
  }
};

module.exports = {
  createRecipes,
  validateRecipe,
  listRecipes,
  findById,
};
