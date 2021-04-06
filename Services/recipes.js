const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const usersModel = require('../Models/users');
const recipesModel = require('../Models/recipes');

const addRecipe = async (recipeInfo) => recipesModel.addRecipe(recipeInfo);
const getAllRecipes = async () => recipesModel.getAllRecipes();
const getOneRecipe = async (id) => recipesModel.getOneRecipe(id);
const updateRecipe = async (id, recipe) => recipesModel.updateRecipe(id, recipe);
const deleteRecipe = async (id) => recipesModel.deleteRecipe(id);
const addImagePath = async (id, image) => recipesModel.addImagePath(id, image);

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });
  try {
    const decoded = jwt.verify(req.headers.authorization, 'token123');
    const user = await usersModel.getOneUser(decoded.data.email);
    if (!user) return res.status(401).json({ message: 'jwt malformed' });
    req.user = decoded.data;
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  next();
};

const validRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  next();
};

module.exports = {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe,
  validateToken,
  validRecipe,
  validId,
  addImagePath,
};
