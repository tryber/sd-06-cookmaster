const recipes = require('../models/recipes');

// const minNameLength = 5;
// const nullQuantity = 0;
const idMongoLength = 24;
const notFoundMessage = 'recipe not found';
// const nameExists = 'Recipe already exists';
// const quantityErrorMessage = '"quantity" must be larger than or equal to 1';
// const quantityTypeErrorMessage = '"quantity" must be a number';

const errorWriter = (code, message) => ({
    err: {
    statusCode: code,
    customMessage: message,
  },
});

const userChecker = async (recipeId, user) => {
  const { userId } = await recipes.findById(recipeId);
  const { _id } = user;
  if (JSON.stringify(userId) === JSON.stringify(_id)) return true;

  return false;
};

const getAll = async () => {
  const recipesArray = await recipes.getAll();

  return recipesArray;
};

const findById = async (id) => {
  if (id.length !== idMongoLength) return errorWriter(404, notFoundMessage);

  const recipe = await recipes.findById(id);

  if (!recipe) return errorWriter(404, notFoundMessage);
  
  return recipe;
};

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return errorWriter(400, 'Invalid entries. Try again.');
  }
  const { insertedId } = await recipes.create(name, ingredients, preparation, userId);
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

const update = async (id, updateRecipe, loggedUser) => {
  if (id.length !== idMongoLength) return errorWriter(404, notFoundMessage);
  const { name, ingredients, preparation } = updateRecipe;
  const checkUser = await userChecker(id, loggedUser);
  if (!checkUser && loggedUser.role !== 'admin') {
    return errorWriter(401, 'User unauthorized to update recipe');
  }

  const updatedRecipe = await recipes.update(id, name, ingredients, preparation);
  if (!updatedRecipe) return errorWriter(404, 'Recipe not found');
  return updatedRecipe;
};

const deleteRecipe = async (id, loggedUser) => {
  if (id.length !== idMongoLength) return errorWriter(404, notFoundMessage);
  const checkUser = await userChecker(id, loggedUser);
  if (!checkUser && loggedUser.role !== 'admin') {
    return errorWriter(401, 'User unauthorized to delete recipe');
  }
  const result = await recipes.deleteRecipe(id);
  if (result.deletedCount === 1) return result;

  return errorWriter(500, 'Couldn´t delete recipe');
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteRecipe,
};