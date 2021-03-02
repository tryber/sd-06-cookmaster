const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');
const recipesModel = require('../models/recipesModel');

const UNAUTHORIZED = 401;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;

const registerRecipe = async (recipeInfo) => recipesModel.registerRecipe(recipeInfo);
const getAllRecipes = async () => recipesModel.getAllRecipes();
const findOneRecipe = async (id) => recipesModel.findOneRecipe(id); 

const validateToken = async (request, response, next) => {
  try {
    const decoded = jwt.verify(request.headers.authorization, '1234');
    const user = await usersModel.getOneUser(decoded.data.email);
    if (!user) return response.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
    request.user = decoded.data;
  } catch (err) {
    return response.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  }
  
  next();
};

const verifyRecipe = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateId = (request, response, next) => {
  const { id } = request.params;
  if (!ObjectId.isValid(id)) {
    return response.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  next();
};

module.exports = {
  validateToken,
  verifyRecipe,
  registerRecipe,
  getAllRecipes,
  findOneRecipe,
  validateId,
};
