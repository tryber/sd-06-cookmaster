const Recipe = require('../services/Recipe');

const statusBadRequest = 400;
const statusCreated = 201;
const statusSuccess = 200;
const statusNotFound = 404;
const statusNoContent = 204;

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

const find = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipe.find(id);

  if (!recipe) return res.status(statusNotFound).json({ message: 'recipe not found' });

  return res.status(statusSuccess).json(recipe);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await Recipe.edit(id, name, ingredients, preparation);
  const recipe1 = await Recipe.find(id);

  return res.status(statusSuccess).json(recipe1);
};

const remove = async (req, res) => {
  const { id } = req.params;

  await Recipe.remove(id);

  return res.status(statusNoContent).send();
};

module.exports = {
  create,
  findAll,
  find,
  edit,
  remove,
};
