const { Router } = require('express');
const rescue = require('express-rescue');
const RecipesService = require('../services/RecipesService');
const { verifyToken } = require('../utils');

const router = Router();

router.post('/', 
  rescue(verifyToken), 
  rescue(RecipesService.verifyFields),
  rescue(RecipesService.insertRecipe));

router.get('/', rescue(RecipesService.getAll));

router.get('/:id', rescue(RecipesService.findById));

router.put('/:id', 
  rescue(verifyToken), 
  rescue(RecipesService.verifyFields),
  rescue(RecipesService.updateRecipe));

router.delete('/:id', 
  rescue(verifyToken),
  rescue(RecipesService.deleteRecipe));

module.exports = router;
