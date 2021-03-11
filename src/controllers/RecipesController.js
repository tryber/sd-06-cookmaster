const CreateRecipeService = require('../services/CreateRecipeService');
const SearchAllRecipesService = require('../services/SearchAllRecipesService');
const SearchRecipeByIdService = require('../services/SearchRecipeByIdService');
const UpdateRecipeByIdService = require('../services/UpdateRecipeByIdService');
const DeleteRecipeByIdService = require('../services/DeleteRecipeByIdService');

const OK = 200;
// const CREATED = 201;
// const NO_CONTENT = 204;

const createRecipe = async (req, res) => {
  if (!req.body || !req.headers) { return; }

  await CreateRecipeService(req.body, req.headers, res); 
}; 

const searchAllRecipes = async (_req, res) => {
  const allRecipe = await SearchAllRecipesService(res); 

  return res.status(OK).json(allRecipe);
}; 

const searchRecipeById = async (req, res) => {
  const { id } = req.params;

  await SearchRecipeByIdService(id, res); 
}; 

const updateRecipeById = async (req, res) => {
  const { id } = req.params;

  await UpdateRecipeByIdService(id, req, res);
}; 

const deleteRecipeById = async (req, res) => {
    const { id } = req.params;
  
    await DeleteRecipeByIdService(id, req, res);
}; 

module.exports = {
  createRecipe,
  searchAllRecipes,
  searchRecipeById,
  updateRecipeById,
  deleteRecipeById,
};
