const { ObjectId } = require('mongodb');

const { deleteRecipeById } = require('../models/Recipes');

const deleteRecipeByIdService = async (id) => {
  const errMessage = 'recipe not found';

  if (!ObjectId.isValid(id)) return { err: { code: 404, message: errMessage } };

  const result = await deleteRecipeById(id);

  if (!result) return { err: { code: 404, message: errMessage } };

  return result;
};

module.exports = {
  deleteRecipeByIdService,
};
