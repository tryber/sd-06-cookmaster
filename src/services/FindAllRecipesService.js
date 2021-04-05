const { findAllRecipes } = require('../models/Recipes');

const findAllRecipesService = async () => {
  const allRecipes = await findAllRecipes();

  return allRecipes;
};

module.exports = {
  findAllRecipesService,
};