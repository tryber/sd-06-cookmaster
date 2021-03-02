const {
  create,
  findId,
  findEmail,
  getAll,
  update,
  remove } = require('../models/recipesModel');

const createRecipe = async (recipe) => {
  const newRecipe = await create(recipe);
  return newRecipe;
};

const deleteRecipe = async (id) => {
  try {
    return await remove(id);
  } catch (e) {
    console.log(e);
  }
};

const updateRecipe = async (recipe) => {
  try {
    const updatedRecipe = await update(recipe);
    return updatedRecipe;
  } catch (e) {
    console.log(e);
  }
};

const findRecipeById = async (id) => {
  try {
    const recipe = await findId(id);

    return recipe;
  } catch (e) {
    throw new Error(e);
  }
};

const findByEmail = async (email) => {
  const user = await findEmail(email);

  return user;
};

const getRecipes = async () => {
  try {
    const recipes = await getAll();

    return recipes;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createRecipe,
  findRecipeById,
  findByEmail,
  getRecipes,
  updateRecipe,
  deleteRecipe,
};
