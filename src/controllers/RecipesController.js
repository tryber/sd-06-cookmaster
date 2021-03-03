const CreateRecipeService = require('../services/CreateRecipeService');
const SearchAllRecipesService = require('../services/SearchAllRecipesService');
const SearchRecipeByIdService = require('../services/SearchRecipeByIdService');

const OK = 200;
const CREATED = 201;

const createRecipe = async (req, res) => {
  const newRecipe = await CreateRecipeService(req.body, req.headers, res); 

  res.status(CREATED).json({
    recipe: newRecipe,
  });
}; 

const searchAllRecipes = async (_req, res) => {
  const allRecipe = await SearchAllRecipesService(res); 

  res.status(OK).json(allRecipe);
}; 

const searchRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipesById = await SearchRecipeByIdService(id, res); 

  res.status(OK).json(recipesById);
}; 

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchRecipeById,
};
