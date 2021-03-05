const { Router } = require('express');
// const { } = require('../services');
const { verifyAuth, recipesMiddlewares: recipes } = require('../middlewares');

const router = Router();

router.post('/', verifyAuth, recipes.verifyBodyRecipe, recipes.createRecipe);

router.get('/', recipes.listRecipes);

router.get('/:id', recipes.listForId);

module.exports = router;
