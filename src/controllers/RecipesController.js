const { createRecipeService } = require('../services/CreateRecipeService');
const { findAllRecipesService } = require('../services/FindAllRecipesService');

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

module.exports = {
  createRecipeController,
  findAllRecipesController,
};