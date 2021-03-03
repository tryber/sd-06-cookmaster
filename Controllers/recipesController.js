const { Router } = require('express');
const recipesService = require('../Services/recipesService');
const validateJWT = require('../Middlewares/verifyAuthorization');
const { validateEntries } = require('../Middlewares/recipesValidators');

const router = Router();

router.post('/', validateJWT, validateEntries, async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
  
    const newRecipe = await recipesService
    .createRecipeService(name, ingredients, preparation, userId);
  
    return res.status(201).json({ recipe: newRecipe });
  });
   
module.exports = router;