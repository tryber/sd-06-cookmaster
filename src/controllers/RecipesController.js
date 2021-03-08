const { Router } = require('express');
const RecipesServices = require('../services/RecipesServices');
const VerifyAuthotization = require('../middlewares/VerifyAuthotization');

const RecipesController = new Router();

RecipesController.post('/', VerifyAuthotization, RecipesServices);

module.exports = RecipesController;