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

const deleteProduct = async (id) => {
  try {
    return await remove(id);
  } catch (e) {
    console.log(e);
  }
};

const updateProduct = async (product) => {
  try {
    await update(product);
    return product;
  } catch (e) {
    console.log(e);
  }
};

const findProductById = async (id) => {
  try {
    const product = await findId(id);

    return product;
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
  findProductById,
  findByEmail,
  getRecipes,
  updateProduct,
  deleteProduct,
};
