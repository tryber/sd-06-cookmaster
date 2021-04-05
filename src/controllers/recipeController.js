const express = require('express');

const RecipeModel = require('../models/recipeModel');

const { 
  verifyRecipe,
  verifyID,
  validateJWT,
} = require('../middlewares/validations');

const uploadImage = require('../middlewares/uploadImage');

const routes = express.Router();

// Criar receita
routes.post('/', verifyRecipe, validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, _id);

  return res.status(201).json({ recipe });
});

// Listar todas as receitas
routes.get('/', async (_req, res) => {
  const allRecipes = await RecipeModel.getAllRecipes();

  return res.status(200).json(allRecipes);
});

// Procurar uma receita pelo ID
routes.get('/:id', verifyID, async (req, res) => {
  const { id } = req.params;
  const recipe = await RecipeModel.findByIdRecipe(id);

  return res.status(200).json(recipe);
});

// Editar uma receita pelo ID
routes.put('/:id', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const recipe = await RecipeModel.updateRecipe(id, name, ingredients, preparation);

  return res.status(200).json(recipe);
});

// Remover uma receita pelo ID
routes.delete('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  await RecipeModel.removeRecipe(id);

  return res.status(204).send();
});

// Adicionar uma imagem na receita pelo ID
routes.put('/:id/image/', validateJWT, uploadImage, async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/images/${id}.jpeg`;

  const recipe = await RecipeModel.addImageRecipe(id, image);

  return res.status(200).send(recipe);
});

module.exports = routes;
