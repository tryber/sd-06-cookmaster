const { Router } = require('express');
const { checkRecipeFields } = require('../middlewares');
const validateJWT = require('../auth/validateJWT');
const RecipesService = require('../services/RecipesService');

const router = Router();

const CREATED = 201;

router.post('/',
  checkRecipeFields,
  validateJWT,
  async (request, response) => {
    const { _id: userId } = request.user;
    const { name, ingredients, preparation } = request.body;
    const registeredRecipe = await RecipesService
      .create(name, ingredients, preparation, userId);
    response.status(CREATED).json(registeredRecipe);
  });

module.exports = router;
