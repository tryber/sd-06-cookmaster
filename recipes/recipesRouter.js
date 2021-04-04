const express = require('express');

const validateToken = require('../authentication/validateToken');

const recipesController = require('./recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', validateToken, recipesController.createRecipe);

recipesRouter.get('/', recipesController.getAllRecipes);

recipesRouter.get('/:id', recipesController.findById);

recipesRouter.put('/:id', validateToken, recipesController.updateRecipe);

recipesRouter.delete('/:id', validateToken, recipesController.removeRecipe);

module.exports = recipesRouter;
