const verifyToken = require('../auth/verifyToken');
const recipesServices = require('../services/recipesServices');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const BAD_MESSAGE = 'Invalid entries. Try again.';
const TOKEN_BAD_MESSAGE = 'jwt malformed';
const MISSING_BAD_MESSAGE = 'missing auth token';

function validateName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

function validateIngredients(req, res, next) {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

function validatePreparation(req, res, next) {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(BAD_REQUEST).json({ message: BAD_MESSAGE });
  }
  next();
}

function validateToken(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(UNAUTHORIZED).json({ message: MISSING_BAD_MESSAGE });
    }
    const payload = verifyToken(authorization);
    req.payload = payload;
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: TOKEN_BAD_MESSAGE });
  }
  next();
}

async function validateId(req, res, next) {
  const { id } = req.params;
  try {
    const foundId = await recipesServices.findProductsById(id);
    if (!foundId) {
      return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }
  } catch (error) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  next();
}

module.exports = {
  validateName,
  validateIngredients,
  validatePreparation,
  validateToken,
  validateId,
};
