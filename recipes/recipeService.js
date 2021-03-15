const { 
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImage,
} = require('./recipeModel');

const createRecipeService = async (recipe) => {
  const { _id } = await createRecipe(recipe);
  return _id;
};

const getAllRecipesService = async () => {
  const allRecipes = await getAllRecipes();
  return allRecipes;
};

const getRecipeByIdService = async (id) => {
  const recipe = await getRecipeById(id);
  return recipe;
};

const updateRecipeService = async (id, name, ingredients, preparation) => {
  const updatedRecipe = await updateRecipe(id, name, ingredients, preparation);
  return updatedRecipe;
};

const deleteRecipeService = async (id) => {
  const value = deleteRecipe(id);
  return value;
};

const updateImageService = async (id, image) => updateImage(id, image);

module.exports = {
  createRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeService,
  deleteRecipeService,
  updateImageService,
};
