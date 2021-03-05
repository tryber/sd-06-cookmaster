const { Router } = require('express');
// const { } = require('../services');
const { verifyAuth, recipesMiddlewares: recipes } = require('../middlewares');
const { recipesCrudDb } = require('../models')

const router = Router();

router.post('/', verifyAuth, recipes.verifyBodyRecipe, recipes.createRecipe);

router.get('/', recipes.listRecipes);

router.get('/:id', recipes.listForId);

router.post('/:id', async (req, res) => {
    const { id } = req.params;
   const value = await recipesCrudDb.update(id, req.body);
return res.json(value) // falta terminar req 07 REFACTORY
});


module.exports = router;
