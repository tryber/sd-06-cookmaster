const {
  validateUser, validateEmail, validateLogin, validateJWT, validateRecipe, validateAdmin,
} = require('./auth');

module.exports = {
  validateUser,
  validateEmail,
  validateLogin,
  validateJWT,
  validateRecipe,
  validateAdmin,
};
