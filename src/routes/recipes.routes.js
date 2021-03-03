const express = require('express');
const controllers = require('../controllers/recipes');
const middlewares = require('../middlewares');

const recipes = express.Router();

recipes.post('/', middlewares.auth, controllers.createRecipe);

module.exports = recipes;
