const validateToken = require('../auth/validateToken');
const { findRecipeById } = require('./recipeServices');

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const err = {
  status: 0,
  messageObject: {
    message: '',
  },
};

const verifyAuthorization = (req, _res, next) => {
  const { authorization: token } = req.headers;
  const payload = validateToken(token);
  if (!token) {
    err.status = UNAUTHORIZED;
    err.messageObject.message = 'missing auth token';
    return next(err);
  }
  if (!payload) {
    err.status = UNAUTHORIZED;
    err.messageObject.message = 'jwt malformed';
    return next(err);
  }
  req.payload = payload;
  next();
};

const validateRecipe = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    err.status = BAD_REQUEST;
    err.messageObject.message = 'Invalid entries. Try again.';
    return next(err);
  }
  return next();
};

const verifyExistRecipe = async (req, _res, next) => {
  const { id } = req.params;
  const foundRecipe = await findRecipeById(id);
  if (!foundRecipe) {
    err.status = NOT_FOUND;
    err.messageObject.message = 'recipe not found';
    return next(err);
  }
  next();
};

module.exports = {
  verifyAuthorization,
  validateRecipe,
  verifyExistRecipe,
};
