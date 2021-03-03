const validateUser = require('./validateUser.validators');
const validateLogin = require('./validateLogin.validators');
const validateRecipe = require('./recipes.validators');

module.exports = {
  validateUser,
  validateLogin,
  validateRecipe,
};
