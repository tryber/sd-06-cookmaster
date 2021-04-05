const { ObjectId } = require('mongodb');

const { findRecipesById } = require('../models/Recipes');

const findRecipeByIdService = async (id) => {
  const errMessage = 'recipe not found';

  if (!ObjectId.isValid(id)) return { err: { code: 404, message: errMessage } };

  const recipeById = await findRecipesById(id);

  if (!recipeById) return { err: { code: 404, message: errMessage } };

  return recipeById;
};

module.exports = {
  findRecipeByIdService,
};