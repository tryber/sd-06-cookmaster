const Service = require('../models/RecipesModel');

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (name, ingredients, preparation, userId) => { 
  const recipe = await Service.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

// Desafio 4 - Listar Receitas
const getAllRecipes = async () => {
  const recipes = await Service.getAllRecipes();
  return recipes;
};

// Desafio 5 - Pesquisar por receita pelo id
const findByIdRecipe = async (id) => {
  const recipe = await Service.findByIdRecipe(id);
  return recipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findByIdRecipe,
};