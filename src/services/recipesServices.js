const jwt = require('jsonwebtoken');

const {
  uploadDB,
  getAll,
  findById,
} = require('../models/mongoDbRequests');

const connectionRecipes = 'recipes';

const getAllRecipes = async () => {
  try {
    const recipes = await getAll(connectionRecipes);
    return recipes;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRecipeById = async (id) => {
  try {
    const recipe = await findById(connectionRecipes, id);
    console.log('recipe', recipe);
    if (!recipe) return null;
    return recipe;
  } catch (err) {
    return null;
  }
};

const registerRecipe = async (body, headers) => {
  const { authorization: token } = headers;
  try {
    const { _id: userId } = jwt.decode(token);
    const copyBodyAddUserId = { ...body, userId };

    await uploadDB(connectionRecipes, copyBodyAddUserId);
    const recipe = copyBodyAddUserId;
    return { recipe };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  registerRecipe,
  getAllRecipes,
  getRecipeById,
};
