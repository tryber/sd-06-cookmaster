const { create, listRecipes, recipeById } = require('../models/RecipesModel');

const status = require('../utils/allStatusCode'); 

const CreateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const { _id } = req.user;
  const { insertedId } = await create(name, ingredients, preparation);
  return res.status(status.CREATED).json({ recipe: {
    name, 
    ingredients, 
    preparation,
    userId: _id,
    _id: insertedId,
  } });
};

const GetAllRecipes = async (_req, res) => {
  const recipes = await listRecipes();
  return res.status(status.OK).json(recipes);
};

const GetRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeById(id);
  if (!recipe) {
    return res.status(status.NOT_FOUND).json({ message: 'recipe not found' });
  }
  return res.status(status.OK).json(recipe);
};

module.exports = {
  CreateRecipe,
  GetAllRecipes,
  GetRecipeById,
};