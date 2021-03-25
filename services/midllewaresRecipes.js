// const { ObjectId } = require('bson');
const jwt = require('jsonwebtoken');

const { findByrecipe } = require('../models/queryRecipes');

const secret = 'secret';
const status400 = 400;
const status401 = 401;
const msgInvalidEntries = 'Invalid entries. Try again.';
const msg = 'jwt malformed';

const nameExists = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
      return res.status(status400).json({ message: msgInvalidEntries });
  }
  next();
};

const ingredientsExists = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(status400).json({ message: msgInvalidEntries });
  }
  next();
};

const preparationExists = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(status400).json({ message: msgInvalidEntries });
  }
  next();
};

const tokenExistis = (req, res, next) => {
  const recipe = req.body;
  const dbRecipe = findByrecipe(recipe);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(status401).json({ message: msg });
  }

  try {
    jwt.verify(authorization, secret, async (err, _decoded) => {
    if (err) return res.status(status401).json({ message: msg });
    // const { email } = decoded.data[0];
    if (!dbRecipe) return res.status(status401).json({ message: msg });
  }); 
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  nameExists,
  ingredientsExists,
  preparationExists,
  tokenExistis,
};
