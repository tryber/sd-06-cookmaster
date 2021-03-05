const { recipesCrudDb } = require('../models');

const create = async (recipe) => recipesCrudDb.createRecipe(recipe);

const getAll = async () => recipesCrudDb.selectAll();

const getById = async (id) => recipesCrudDb.selectById(id);

module.exports = { create, getAll, getById };
