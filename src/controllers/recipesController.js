const {
  insertNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeModel,
  removeRecipe,
} = require('../models/recipesModel');

const SUCCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;
const NO_CONTENT = 204;

const createRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const recipe = await insertNewRecipe(name, ingredients, preparation, _id);
    return res.status(CREATED).json({ recipe });
  } catch (err) {
    next(err);
  }
};

const listAllRecipes = async (req, res, next) => {
  try {
    const recipes = await getAllRecipes(); 
    return res.status(SUCCESS).json(recipes); 
  } catch (error) {
    next(error);
  }
};

const findRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await await getRecipeById(id);
    return res.status(SUCCESS).json(recipe);
  } catch (err) {
    return res.status(NOTFOUND).json({ message: 'recipe not found' });
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;

    const recipe = await updateRecipeModel(id, name, ingredients, preparation);
    return res.status(SUCCESS).json(recipe);
  } catch (err) {
    next(err);
  }
};

const deleteRecipe = async (request, response, next) => {
  try {
    const { id } = request.params;
    await removeRecipe(id);
    return response.status(NO_CONTENT).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRecipe,
  listAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
};
