const usersMiddlewares = require('./usersMiddlewares');
const usersVerify = require('./usersVerify');
const authentication = require('../authentication/generateToken');
const verifyAuth = require('./verifyAuth');
const loginVefiry = require('./loginVerify');
const recipesMiddlewares = require('./recipesMiddlewares');

module.exports = {
    usersMiddlewares,
    usersVerify,
    authentication,
    verifyAuth,
    loginVefiry,
    recipesMiddlewares,
};
