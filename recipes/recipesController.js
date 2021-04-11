const recipesService = require('./recipesService');
const recipesModel = require('./recipesModel');

const createRecipe = async (req, res) => {
  console.log('RECIPES CONTROLLER');

  const { userId } = req;
  console.log('USER ID NO RECIPES CONTROLLER', userId);
  const { name, ingredients, preparation } = req.body;

  const newRecipe = {
    userId,
    name,
    ingredients,
    preparation,
  };

  const { createdRecipe, message } = await recipesService.createRecipe(newRecipe);
  if (message) return res.status(400).json({ message });

  res.status(201).json(createdRecipe);
};

const getAllRecipes = async (req, res) => {
  console.log('GET ALL RECIPES');

  const recipes = await recipesModel.getAllRecipes();

  return res.status(200).json(recipes);
};

const findById = async (req, res) => {
  console.log('FIND BY IS CONTROLLER');

  const { id } = req.params;

  const { recipeById, message } = await recipesService.findById(id);

  if (message) return res.status(404).json({ message });

  res.status(200).json(recipeById);
};

const updateRecipe = async (req, res) => {
  console.log('UPDATE RECIPE CONTROLLER');
  const recipeId = req.params.id;
  const { userId } = req;
  const { name, ingredients, preparation } = req.body;
  const editedRecipe = {
    recipeId,
    name,
    ingredients,
    preparation,
  };

  const { recipe, /* naoAutorizado, */ message } = await recipesService.updateRecipe(
    editedRecipe, userId,
  );
  // if (naoAutorizado) return res.status(naoAutorizado).json({ message });
  if (message) return res.status(404).json({ message });

  res.status(200).json(recipe);
};

const removeRecipe = async (req, res) => {
  console.log('DELETE RECIPE CONROLLER');

  const { id } = req.params;

  const result = await recipesModel.removeRecipe(id);
  res.status(204).json(result);
};

/* Tive muita dificuldade com os requisitos 9 e 10 e usei de vários recursos para conseguir
fazer todo o upload:
- link do pr Havyner: https://github.com/tryber/sd-06-cookmaster/pull/71/files
- link pr do Madsen: https://github.com/tryber/sd-06-cookmaster/pull/25/files
- vídeo youtube: https://www.youtube.com/watch?v=FKnDvu_eODY
- link sobre multer: https://www.webdevdrops.com/upload-arquivos-node-js-multer/
e threads do slack */

const includeImage = async (req, res) => {
  console.log('INCLUDE IMAGE CONTROLLER');
  console.log('PATH', req.file.path);

  const { id } = req.params;
  const oldRecipe = recipesModel.findById(id);
  console.log(oldRecipe);
  const { _id, name, ingredients, preparation, userId } = oldRecipe;

  const editedRecipe = {
    _id, name, ingredients, preparation, userId, image: `localhost:3000/images/${id}.jpeg`,
  };

  const result = await recipesModel.updateImageRecipe(editedRecipe);
  console.log(result);
  res.status(200).json(editedRecipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
  updateRecipe,
  removeRecipe,
  includeImage,
};
