const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { SECRET } = require('../controllers/loginController');

const { allRecipes, createRecipe, oneRecipe, updateRecipe } = require('../models/recipesMoldel');
const { findOneUser } = require('../models/usersModel');

const getAllRecipes = async () => allRecipes();
const recipeCreate = async (data) => createRecipe(data);
const getRecipeById = async (id) => oneRecipe(id);
const recipeUpdate = async (id, name, ingredients, preparation) =>
  updateRecipe(id, name, ingredients, preparation);

const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    const user = await findOneUser(decoded.data.email);
    
    if (!user) return res.status(401).json({ message: 'jwt malformed' });

    req.user = decoded.data;
  } catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  next();
};

const canUserEdit = async (id, email) => {
  const recipe = await getRecipeById(id);
  const user = await findOneUser(email);
  const { _id } = user;

  if (_id.toString() !== recipe.userId.toString() && user.role !== 'admin') {
    return false;
  }

  return true;
};

module.exports = {
  validateId,
  validateRecipe,
  validateToken,
  getRecipeById,
  recipeCreate,
  getAllRecipes,
  recipeUpdate,
  canUserEdit,
};
