const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const { SECRET } = require('../controllers/loginController');
const { createRecipe, allRecipes, oneRecipe, updateRecipe } = require('../models/recipesModel');
const { findOneUser } = require('../models/usersModel');
const { invalidData, loginError, NOTFOUND } = require('../variables');

const recipeCreate = async (data) => createRecipe(data);
const getAllRecipes = async () => allRecipes();
const getRecipeById = async (id) => oneRecipe(id);
const recipeUpdate = async (id, name, ingredients, preparation) =>
  updateRecipe(id, name, ingredients, preparation);

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(loginError).json({ message: 'missing auth token' });
  } 

  try {
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    const user = await findOneUser(decoded.data.email);
    
    if (!user) return res.status(loginError).json({ message: 'jwt malformed' });

    req.user = decoded.data;
  } catch (err) {
    return res.status(loginError).json({ message: 'jwt malformed' });
  }

  next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(invalidData).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(NOTFOUND).json({ message: 'recipe not found' });

  next();
};

module.exports = {
  validateToken,
  validateRecipe,
  recipeCreate,
  getAllRecipes,
  getRecipeById,
  validateId,
  recipeUpdate,
};
