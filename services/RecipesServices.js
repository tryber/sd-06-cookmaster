const RecipesModels = require('../models/RecipesModels');

const create = async (data) => {
  const recipe = await RecipesModels.create(data);

  return recipe;
};

module.exports = {
  create,
};
