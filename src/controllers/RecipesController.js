const { Router } = require('express');
const rescue = require('express-rescue');
const RecipesService = require('../services/RecipesService');
const { verifyToken } = require('../utils');

const router = Router();

router.post('/', 
  rescue(verifyToken), 
  rescue(RecipesService.verifyFields),
  rescue(RecipesService.insertRecipe));

router.get('/', RecipesService.getAll);

module.exports = router;
