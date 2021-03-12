const jwt = require('jsonwebtoken');
const { secret } = require('../utils/auth');
const { findByEmail } = require('../models/userModel');
const { getRecipeById } = require('../models/recipeModel');

const messages = {
    invalidEntries: 'Invalid entries. Try again.',
    jwt: 'jwt malformed',
};

const validatePresenceOfEmailPassword = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regexEmail.test(req.body.email)) {
    return res.status(400).json({
      message: messages.invalidEntries,
    });
  }
  next();
};

const validateLoginEmail = (req, res, next) => {
  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (!regexEmail.test(req.body.email)) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  next();
};

const validatePresenceOfNameIngredientsPreparation = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: messages.invalidEntries,
    });
  }
  next();
};

const validateRecipeExistsById = async (req, res, next) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: 'recipe not found',
      });
    }
    next();
  } catch (e) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }
};

const validatePresenceOfUsernameEmailPassword = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

const validateEmailIsUnique = async (req, res, next) => {
  const user = await findByEmail(req.body.email);
  if (user) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next();
};

const validateJWTBasic = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, secret);

    if (!data) {
      return res.status(401).json({ message: messages.jwt });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: messages.jwt });
  }
};

const validateJWTToUpdate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    const data = jwt.verify(token, secret);
    if (!data) {
      return res.status(401).json({ message: 'missing auth token' });
    }

    req.data = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: messages.jwt });
  }
};

module.exports = {
  validateEmail,
  validateJWTBasic,
  validateLoginEmail,
  validateJWTToUpdate,
  validateEmailIsUnique,
  validateRecipeExistsById,
  validatePresenceOfEmailPassword,
  validatePresenceOfUsernameEmailPassword,
  validatePresenceOfNameIngredientsPreparation,
};
