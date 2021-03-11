const checkNewUserFields = require('./checkNewUserFields');
const checkEmailRepetition = require('./checkEmailRepetition');
const validateEmail = require('./validateEmail');
const checkLoginFields = require('./checkLoginFields');
const checkRecipeFields = require('./checkRecipeFields');
const validateRecipeId = require('./validateRecipeId');
const checkPermissions = require('./checkPermissions');
const validateAdmin = require('./validateAdmin');

module.exports = {
  checkNewUserFields,
  checkEmailRepetition,
  validateEmail,
  checkLoginFields,
  checkRecipeFields,
  validateRecipeId,
  checkPermissions,
  validateAdmin,
};
