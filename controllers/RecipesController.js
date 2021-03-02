const { Router } = require('express');

const { CREATED, SUCCESS, NOT_FOUND, NO_CONTENT } = require('../utils');

const message = 'recipe not found';

const {
  getAllRecipes, createRecipe, getRecipeById, updateRecipe, removeRecipe,
} = require('../services');
const { validateJWT, validateRecipe } = require('../middlewares');

const routerRecipes = Router();

routerRecipes.post('/', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipeCreated = await createRecipe(userId, name, ingredients, preparation);
  return res.status(CREATED).json(recipeCreated);
});

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllRecipes();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.get('/:id', async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(NOT_FOUND).json({ message });
  return res.status(SUCCESS).json(recipe);
});

routerRecipes.put('/:id', validateJWT, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const recipe = await getRecipeById(recipeId);
  if (!recipe) return res.status(NOT_FOUND).json({ message });
  const { _id: userId } = req.user;
  const recipeUpdated = await updateRecipe(recipeId, userId, name, ingredients, preparation);
  return res.status(SUCCESS).json(recipeUpdated);
});

routerRecipes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const recipes = await removeRecipe(id);
  if (!recipes) return res.status(NOT_FOUND).json({ message });
  res.status(NO_CONTENT).json();
});

routerRecipes.put('/:id/image', validateJWT, async (req, _res) => {
  const { id: thisRecipeId } = req.params; 
  const { user } = req;
  if (!user.role || user.role === 'user') {
    const { _id: thisUserId } = user;
    const idUser = JSON.stringify(thisUserId);
    const recipe = await getAllRecipes()
    .filter((e) => JSON.stringify(e.userId) === idUser);
    console.log(thisRecipeId, recipe);
    return console.log('usuario logado não é um adm');
    // funcao que compara o ID do usuario aos userId -> ok
    // criar e chamar funcao que cadastra a imagem via multer
    // enviar objeto de receita para funcao que cadastra imagem
  }
  if (user.role && user.role === 'admin') {
    // criar e chamar funcao que cadastra a imagem via multer
    // enviar objeto de receita para funcao que cadastra imagem (adm não precisa checar id)
  return console.log('usuario é um adm');
  }
});

module.exports = routerRecipes;
