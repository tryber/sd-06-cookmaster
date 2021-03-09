const express = require('express');
const Recipe = require('../controllers/Recipe');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipeRoutes = express.Router();

recipeRoutes.post('/', verifyAuthorization, Recipe.create);

recipeRoutes.put('/:id', verifyAuthorization, Recipe.edit);

recipeRoutes.get('/:id', Recipe.find);

recipeRoutes.get('/', Recipe.findAll);

module.exports = recipeRoutes;
