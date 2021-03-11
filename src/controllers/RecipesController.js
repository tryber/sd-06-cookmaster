const CreateRecipeService = require('../services/CreateRecipeService');
const SearchAllRecipesService = require('../services/SearchAllRecipesService');
const SearchRecipeByIdService = require('../services/SearchRecipeByIdService');
const UpdateRecipeByIdService = require('../services/UpdateRecipeByIdService');
const DeleteRecipeByIdService = require('../services/DeleteRecipeByIdService');

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

const createRecipe = async (req, res) => {
  if (!req.body || !req.headers) { return; }

  const recipe = await CreateRecipeService(req.body, req.headers, res); 

  res.status(CREATED).json({
    recipe,
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

const updateRecipeById = async (req, res) => {
  const { id } = req.params;

  const updateRecipe = await UpdateRecipeByIdService(id, req, res); 

  res.status(OK).json(updateRecipe);
}; 

const deleteRecipeById = async (req, res) => {
  const { id } = req.params;

  const recipeById = await DeleteRecipeByIdService(id, req, res); 

  res.status(NO_CONTENT).json(recipeById);
}; 

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
