const jwt = require('jsonwebtoken');

const { secret } = require('../Controllers/loginController');
const { createRecipe, getAllRecipes } = require('../Models/recipesModel');
const { findOneUser } = require('../Models/usersModel');

const fourHundred = 400;
const fourHundredOne = 401;

const getRecipes = async () => getAllRecipes();
const createNewRecipe = async (data) => createRecipe(data);

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

module.exports = {
  createNewRecipe,
  getRecipes,
  validateRecipe,
  validateToken,
};
