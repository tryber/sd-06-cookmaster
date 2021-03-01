const jwt = require('jsonwebtoken');

const { SECRET } = require('../controllers/loginController');
const { createRecipe } = require('../models/recipesModel');
const { findOneUser } = require('../models/usersModel');
const { invalidData, loginError } = require('../variables');

const recipeCreate = async (data) => createRecipe(data);

const validateToken = async (req, res, next) => {
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

module.exports = {
  validateToken,
  validateRecipe,
  recipeCreate,
};
