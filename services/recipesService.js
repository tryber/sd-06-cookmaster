const recipesModel = require('../models/recipesModel');

const getAll = async () => recipesModel.getAll();

const getByRecipeName = async (name) => recipesModel.getByRecipeName(name);

const create = async ({ name, ingredients, preparation }) => {
  if (!name || !ingredients || !preparation) {
    return { error: true, code: 'bad_request', message: 'Invalid entries. Try again.' };
  }
  const user = await recipesModel.create({ name, ingredients, preparation });
  return user;
};

module.exports = { create, getAll, getByRecipeName };