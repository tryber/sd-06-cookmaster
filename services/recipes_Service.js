const { ObjectId } = require('mongodb');
const recipes = require('../models/recipes');

const BadRequest = 400;
const Unauthorized = 401;
const NotFound = 404;

const getAllRecipes = () => recipes.getAll();

const createRecipe = (body, userId) => recipes.setRecipe(body, userId);

const findRecipeById = (id) => recipes.findById(id);

const editRecipeById = (id, name, ingredients, preparation) =>
  recipes.editById(id, name, ingredients, preparation);

const deleteRecipeById = (id) => recipes.deleteById(id);

const uploadRecipeImage = (id) => recipes.uploadImage(id);

const validateCreateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;
  const authorizationVerify = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  
  if (!name || !ingredients || !preparation) {
    return res.status(BadRequest).json({ message: 'Invalid entries. Try again.' });
  }

  if (!authorization || !authorizationVerify.test(authorization)) {
    return res.status(Unauthorized).json({ message: 'jwt malformed' });
  }

  next();
};

const validateFindById = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(NotFound).json({ message: 'recipe not found' });
  }

  next();
};

const validateAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const authorizationVerify = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

  if (!authorization) {
    return res.status(Unauthorized).json({ message: 'missing auth token' });
  }

  if (!authorizationVerify.test(authorization)) {
    return res.status(Unauthorized).json({ message: 'jwt malformed' });
  }

  next();
};

module.exports = {
  getAllRecipes,
  createRecipe,
  findRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
  validateCreateRecipe,
  validateFindById,
  validateAuth,
};
