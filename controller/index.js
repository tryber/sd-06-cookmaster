const users = require('./userController');
const login = require('./login');
const recipesRouter = require('./recipesController');

module.exports = {
  users,
  login,
  recipesRouter,
};
