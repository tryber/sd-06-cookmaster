const express = require('express');

const validateToken = require('../authentication/validateToken');

const recipesController = require('./recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', validateToken, recipesController.createRecipe);

module.exports = recipesRouter;
