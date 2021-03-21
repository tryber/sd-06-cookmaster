const validationsRecipes = require('./validationRecipes');
const validationsLogin = require('./validationsLogin');
const createRecipes = require('./createRecipes');
const deleteRecipe = require('./deleteRecipe');
const authValidate = require('./authValidate');
const validations = require('./validations');
const getRecipes = require('./getRecipes');
const createUser = require('./createUser');
const editRecipe = require('./editRecipe');
const getRecipe = require('./getRecipe');
const getUsers = require('./getUsers');
const auth = require('./auth');

module.exports = {
  validationsRecipes,
  validationsLogin,
  createRecipes,
  validations,
  editRecipe,
  getRecipes,
  getRecipe,
  createUser,
  getUsers,
  auth,
  authValidate,
  deleteRecipe,
};