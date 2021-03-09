const express = require('express');
const Recipe = require('../controllers/Recipe');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipeRoutes = express.Router();

recipeRoutes.post('/', verifyAuthorization, Recipe.create);
recipeRoutes.get('/:id', Recipe.findOne);
recipeRoutes.get('/', Recipe.findAll);

module.exports = recipeRoutes;
