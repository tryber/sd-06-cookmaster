const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const RecipesService = require('../services/RecipesService');
const { checkRecipeFields } = require('../middlewares');

const router = Router();

const CREATED = 201;

router.post('/',
  validateJWT,
  checkRecipeFields,
  async (request, response) => {
    const { _id: userId } = request.user;
    const { name, ingredients, preparation } = request.body;
    const registeredRecipe = await RecipesService
      .create(name, ingredients, preparation, userId);
    response.status(CREATED).json(registeredRecipe);
  });

module.exports = router;
