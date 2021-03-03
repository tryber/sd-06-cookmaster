const CreateRecipeService = require('../services/CreateRecipeService');
const SearchAllRecipesService = require('../services/SearchAllRecipesService');

const OK = 200;
const CREATED = 201;

const createRecipe = async (req, res) => {
  const newRecipe = await CreateRecipeService(req.body, req.headers, res); 

  res.status(CREATED).json({
    recipe: newRecipe,
  });
}; 

const searchAllRecipes = async (_req, res) => {
  const newRecipe = await SearchAllRecipesService(res); 

  res.status(OK).json(newRecipe);
}; 

module.exports = {
  createRecipe,
  searchAllRecipes,
};
