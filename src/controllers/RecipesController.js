const { Router } = require('express');
const { TokenValidation } = require('../Auth/TokenValidation');
const { RecipesValidation } = require('../middlewares/RecipesValidation');
const { RecipesCreateService, RecipesGetAllServices } = require('../services/RecipesService');

const RecipesController = new Router();

// Requisito 3
RecipesController.post('/', TokenValidation, RecipesValidation, RecipesCreateService);

// Requisição 4
RecipesController.get('/', RecipesGetAllServices);
RecipesController.get('/', TokenValidation, RecipesGetAllServices);

module.exports = RecipesController;
