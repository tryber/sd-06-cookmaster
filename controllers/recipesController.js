const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');
const { badRequest, created, ok, conflict, notFound, noContent } = require('../utilities/variables');
const { getByEmail } = require('./userController');

const getAll = rescue(async (_req, res) => {
  const recipes = await recipesService.getAll();
  return res.status(ok).json(recipes);
});

const getByRecipeName = async (name) => {
  const user = await recipesService.getByRecipeName(name);
  return user;
};

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (recipe.error && recipe.code === 'not_found') {
    return res.status(notFound).json({ message: recipe.message });
  }
  return res.status(ok).json(recipe);
});

const create = rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const recipeExist = await getByRecipeName(name);
  const { loggedEmail } = res.locals;
  const user = await getByEmail(loggedEmail);
  const { _id } = user;
  if (recipeExist !== null) {
    return res.status(conflict).json(
      { error: true, code: 'conflict', message: 'This recipe already exists.' },
    );
  } 
  const recipe = await recipesService.create({ name, ingredients, preparation });
  if (recipe.error && recipe.code === 'bad_request') {
    return res.status(badRequest).json({ message: recipe.message });
  }
  return res.status(created).json({
    recipe: { name, ingredients, preparation, _id: recipe.insertedId, userId: _id },
  });
});

const edit = rescue(async (req, res, _next) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { loggedEmail } = res.locals;
  const user = await getByEmail(loggedEmail);
  req.user = user;
  const recipeExist = await getByRecipeName(name);
  if (recipeExist !== null) {
    return res.status(conflict).json(
      { error: true, code: 'conflict', message: 'This recipe already exists.' },
    );
  } 
  const recipe = await recipesService.edit(name, ingredients, preparation, id);
  if (recipe.error && recipe.code === 'bad_request') {
    return res.status(badRequest).json({ message: recipe.message });
  }
  return res.status(ok).json({ name, ingredients, preparation, _id: recipe.insertedId });
});

const exclude = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const recipes = await recipesService.exclude(id);
  console.log(recipes);
  if (!recipes) res.status(notFound).json({ message: 'recipe not found' });
  res.status(noContent).json();
});

module.exports = { create, getAll, getByRecipeName, getById, edit, exclude };