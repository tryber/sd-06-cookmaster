const { Router } = require('express');
const verifyTokenJWTValid = require('../middlewares/verifyTokenJWTValid');
const { registerRecipe } = require('../service/serviceRecipes');

const route = Router();

route.post('/', verifyTokenJWTValid, registerRecipe);

module.exports = route;