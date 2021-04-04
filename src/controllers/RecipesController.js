const { createRecipeService } = require('../services/CreateRecipeService');
const { findAllRecipesService } = require('../services/FindAllRecipesService');
const { findRecipeByIdService } = require('../services/FindRecipeByIdService');

const status201 = 201;
const status200 = 200;

const createRecipeController = async (req, res) => {
  const newRecipe = await createRecipeService(req.body);

  if (newRecipe.err) { 
    return res.status(newRecipe.err.status).json({ message: newRecipe.err.message });
  }

  return res.status(status201).json(newRecipe);
};

const findAllRecipesController = async (_req, res) => {
  const allRecipes = await findAllRecipesService();

  if (allRecipes) res.status(status200).json(allRecipes);
}; 

const findRecipeByIdController = async (req, res) => {
  const { id } = req.params;

  const result = await findRecipeByIdService(id);

  if (result.err) return res.status(result.err.code).json({ message: result.err.message });

  return res.status(status200).json(result);
};

module.exports = {
  createRecipeController,
  findAllRecipesController,
  findRecipeByIdController,
};