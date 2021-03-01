const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const { secret } = require('../Controller/loginController');
const { createRecipe, findAllRecipes, findOneRecipe } = require('../Model/recipesModel');
const { findOneUser } = require('../Model/usersModel');

const fourHundred = 400;
const fourHundredOne = 401;
const fourHundredFour = 404;

const createNewRecipe = async (data) => createRecipe(data);
const getAllRecipes = async () => findAllRecipes();
const getRecipeById = async (id) => findOneRecipe(id);

const validateToken = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, secret);
    const user = await findOneUser(decoded.data.email);

    if (!user) {
      return res.status(fourHundredOne).json({ message: 'jwt malformed' });
    }

    req.user = decoded.data;
  } catch (err) {
    return res.status(fourHundredOne).json({ message: 'jwt malformed' });
  }

  next();
};

const validateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(fourHundred).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(fourHundredFour).json({
    message: 'recipe not found',
    });
  }

  next();
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  validateRecipe,
  validateToken,
  validateId,
};
