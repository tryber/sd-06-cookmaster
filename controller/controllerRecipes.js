const { Router } = require('express');
const verifyTokenJWTValid = require('../middlewares/verifyTokenJWTValid');

const VerifyTokenJWTValidInDeleteRecipe = require(
    '../middlewares/VerifyTokenJWTValidInDeleteRecipe',
    );
const verifyTokenJWTValidInEditRecipes = require(
    '../middlewares/VerifyTokenJWTValidInEditRecipes',
    );
const { idLengthValidation } = require('../middlewares/idLengthValidation');

const {
    registerRecipe,
    getRecipes,
    getRecipesForId,
    editRecipe,
    deleteRecipe } = require('../service/serviceRecipes');

const route = Router();

route.post('/', verifyTokenJWTValid, registerRecipe);

route.get('/', getRecipes);

route.get('/:id', idLengthValidation, getRecipesForId);

route.put('/:id', verifyTokenJWTValidInEditRecipes, editRecipe);

route.delete('/:id', VerifyTokenJWTValidInDeleteRecipe, deleteRecipe);

module.exports = route;