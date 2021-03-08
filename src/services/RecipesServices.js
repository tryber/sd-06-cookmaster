// const { ObjectId } = require('mongodb');
const { create, listRecipes, recipeById, updateRecipe } = require('../models/RecipesModel');

const status = require('../utils/allStatusCode'); 

const CreateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  
  if (!name || !ingredients || !preparation) {
    return res.status(status.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  const { _id } = req.user;
  const { insertedId } = await create(name, ingredients, preparation, _id);
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
  try {
    const recipe = await recipeById(id);
    return res.status(status.OK).json(recipe);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ message: 'recipe not found' });
  }
};

const UpdateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const image = 'no image yet';

  await updateRecipe({ id, name, ingredients, preparation, image });
  const updatedRecipe = await recipeById(id);
  return res.status(status.OK).json(updatedRecipe);
};

module.exports = {
  CreateRecipe,
  GetAllRecipes,
  GetRecipeById,
  UpdateRecipe,
};