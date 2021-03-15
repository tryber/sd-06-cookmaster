const findRecipe = require('./findRecipe');
const validateDuplicateEmail = require('./validateDuplicateEmail');
const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validatePrivilege = require('./validatePrivilege');
const validateRecipe = require('./validateRecipe');
const validateToken = require('./validateToken');

module.exports = {
  findRecipe,
  validateDuplicateEmail,
  validateLogin,
  validateNewUser,
  validatePrivilege,
  validateRecipe,
  validateToken,
};
