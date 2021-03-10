const RecipesServices = require('../services/RecipesService');

const SUCCESS = 200;
const CREATED = 201;

const getAllRecipes = async (req, res) => {
  const recipes = await RecipesServices.getUserAll();
  res.status(SUCCESS).json({ Recipes: recipes });
};

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipe = await RecipesServices.createRecipe(name, ingredients, preparation, userId);
  res.status(CREATED).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
};