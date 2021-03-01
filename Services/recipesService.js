const jwt = require('jsonwebtoken');

const { secret } = require('../Controller/loginController');
const { createRecipe } = require('../Model/recipesModel');
const { findOneUser } = require('../Model/usersModel');

const createNewRecipe = async (data) => createRecipe(data);

const fourHundred = 400;
const fourHundredOne = 401;

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
  validateRecipe,
  validateToken,
};
