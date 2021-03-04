const { Router } = require('express');
const recipesService = require('../Services/recipesService');
const validateJWT = require('../Middlewares/verifyAuthorization');
const { validateEntries, validateId, recipeExists } = require('../Middlewares/recipesValidators');

const router = Router();

router.post('/', validateJWT, validateEntries, async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
  
    const newRecipe = await recipesService
    .createRecipeService(name, ingredients, preparation, userId);
  
    return res.status(201).json({ recipe: newRecipe });
  });
 
  router.get('/', async (req, res) => {
    const list = await recipesService.listRecipesService();
    return res.status(200).json(list);
  });
  
  router.get('/:id', validateId, recipeExists, async (req, res) => {
    const { id } = req.params;   
    const recipe = await recipesService.recipeByIdService(id);  
    return res.status(200).json(recipe);
  });

module.exports = router;