const { Router } = require('express');
const rescue = require('express-rescue');
const { RecipesServices } = require('../services');
const { LoginValidator, RecipeValidator, Multer } = require('../middlewares');

const RecipeRoute = new Router();
const status200 = 200;
const status201 = 201;
const status204 = 204;

RecipeRoute.get('/', rescue(async (_req, res) => {
  const allRecipes = await RecipesServices.getAll();
  res.status(status200).json(allRecipes);
}));

RecipeRoute.get('/:id',
  RecipeValidator.GetByIdValidator,
  rescue(async (req, res) => {
    const { id } = req.params;
    const recipe = await RecipesServices.getById(id);
    res.status(status200).json(recipe);
}));

RecipeRoute.post('/',
  RecipeValidator.RecipeValidator,
  LoginValidator.verifyAuthorization,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.infoUser;
    const newRecipe = await RecipesServices.postRecipe({ name, ingredients, preparation }, _id);
    res.status(status201).json(newRecipe);
}));

RecipeRoute.put('/:id',
  LoginValidator.verifyAuthorization,
  rescue(async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    const { _id } = req.infoUser;
    const editedRecipe = await RecipesServices
      .putRecipe(id, { name, ingredients, preparation }, _id);
    res.status(status200).json(editedRecipe);
}));

RecipeRoute.put('/:id/image',
  LoginValidator.verifyAuthorization,
  RecipeValidator.GetByIdValidator,
  Multer.single('image'),
  rescue(async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const { name, ingredients, preparation, userId } = req.infoRecipe;
    const image = `localhost:3000/images/${filename}`; // Linha copiada do PR do Daniel Madsen após a dúvida tirada durante o plantão.
    console.log(image);
    const recipeWithImage = await RecipesServices
      .putImage(id, { name, ingredients, preparation, userId }, image);
    res.status(status200).json(recipeWithImage);
}));

RecipeRoute.delete('/:id',
  LoginValidator.verifyAuthorization,
  rescue(async (req, res) => {
    const { id } = req.params;
    const deletedRecipe = await RecipesServices.deleteRecipe(id);
    res.status(status204).json(deletedRecipe);
}));

module.exports = RecipeRoute;
