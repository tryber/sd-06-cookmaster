const { ObjectId } = require('mongodb');
const RecipesServices = require('../services/RecipesService');

const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipe = await RecipesServices.createRecipe(name, ingredients, preparation, userId);
  res.status(CREATED).json(recipe);
};

// Desafio 4 - Listar Receitas
const getAllRecipes = async (req, res) => {
  const recipes = await RecipesServices.getAllRecipes();
  console.log(recipes);
  res.status(SUCCESS).json(recipes);
};

// Desafio 5 - Pesquisar por receita pelo id
const findByIdRecipe = async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const recipe = await RecipesServices.findByIdRecipe(id);
    if (recipe) {
      return res.status(SUCCESS).json(recipe);
    }
  }
  res.status(NOT_FOUND).json({ message: 'recipe not found' });
};

// Desafio 6- Atualizar pelo id
const updateIdRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { id } = req.params;
  const recipe = await RecipesServices
    .updateIdRecipe({ id, userId }, name, ingredients, preparation);
  res.status(SUCCESS).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findByIdRecipe,
  updateIdRecipe,
};