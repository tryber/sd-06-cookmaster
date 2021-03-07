const { Router } = require('express');
const verifyTokenJWTValid = require('../middlewares/verifyTokenJWTValid');
const { idLengthValidation } = require('../middlewares/idLengthValidation');

const { registerRecipe, getRecipes, getRecipesForId } = require('../service/serviceRecipes');

const route = Router();

route.post('/', verifyTokenJWTValid, registerRecipe);

route.get('/', getRecipes);

route.get('/:id', idLengthValidation, getRecipesForId);

module.exports = route;