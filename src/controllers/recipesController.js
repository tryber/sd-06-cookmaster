const {
  insertNewRecipe,
  getAllRecipes,
  getRecipeById,
} = require('../models/recipesModel');

const SUCCESS = 200;
const CREATED = 201;
const NOTFOUND = 404;

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

module.exports = {
  createRecipe,
  listAllRecipes,
  findRecipeById,
};
