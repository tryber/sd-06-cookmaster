const Recipe = require('../services/Recipe');

const statusBadRequest = 400;
const statusCreated = 201;
const statusSuccess = 200;

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const recipe = await Recipe.create(name, ingredients, preparation);
  if (!recipe) return res.status(statusBadRequest).json({ message: 'Invalid entries. Try again.' });
  
  const recipe1 = recipe.ops.reduce((acc, e) => ({ ...acc, recipe: e }), {});

  return res.status(statusCreated).json(recipe1);
};

const findAll = async (_req, res) => {
  const recipes = await Recipe.findAll();

  return res.status(statusSuccess).json(recipes);
};

module.exports = {
  create,
  findAll,
};
