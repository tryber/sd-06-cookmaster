const { Router } = require('express');
const recipesService = require('../Services/recipesService');
const validateJWT = require('../Middlewares/verifyAuthorization');
const { validateEntries, validateId, recipeExists } = require('../Middlewares/recipesValidators');

const router = Router();
// Requisito-3
router.post('/', validateJWT, validateEntries, async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
  
    const newRecipe = await recipesService
    .createRecipeService(name, ingredients, preparation, userId);
  
    return res.status(201).json({ recipe: newRecipe });
  });

 // Requisito-4
  router.get('/', async (req, res) => {
    const list = await recipesService.listRecipesService();
    return res.status(200).json(list);
  });

  // Requisito-5
  router.get('/:id', validateId, recipeExists, async (req, res) => {
    const { id } = req.params;   
    const recipe = await recipesService.recipeByIdService(id);  
    return res.status(200).json(recipe);
  });

  // Requisito-7
  router.put('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;  
    const { name, ingredients, preparation } = req.body;  
    await recipesService.updateRecipeService(id, name, ingredients, preparation);
    
    const updatedRecipe = await recipesService.recipeByIdService(id);  
    return res.status(200).json(updatedRecipe);  
  });

  // Requisito-8
  router.delete('/:id', validateJWT, async (req, res) => {
    const { id } = req.params;  
    await recipesService.deleteRecipeService(id);  
    return res.status(204).end();
  });
module.exports = router;