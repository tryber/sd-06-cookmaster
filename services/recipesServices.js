const { recipesCrudDb } = require('../models');

const create = async (recipe) => recipesCrudDb.createRecipe(recipe);

const getAll = async () => recipesCrudDb.selectAll();

const getById = async (id) => recipesCrudDb.selectById(id);

const update = async (id, dataBody) => recipesCrudDb.update(id, dataBody);

const delRecipe = async (id) => recipesCrudDb.deleteRecipe(id);

const updateImage = async (id, image) => recipesCrudDb.updateImage(id, image);

module.exports = { create, getAll, getById, update, delRecipe, updateImage };
