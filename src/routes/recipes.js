const { Router } = require('express');

const RecipesController = require('../controllers/RecipesController'); 

const ensureAuth = require('../middlewares/ensureAuth');

const validateRecipeObj = require('../middlewares/validateRecipeObj');

const recipesRouter = Router();

const recipesController = new RecipesController();

recipesRouter.get('/', recipesController.list);
recipesRouter.get('/:id', recipesController.show);
recipesRouter.post('/', ensureAuth, validateRecipeObj, recipesController.create);
recipesRouter.put('/:id', ensureAuth, validateRecipeObj, recipesController.update);
recipesRouter.delete('/:id', ensureAuth, recipesController.delete);

module.exports = recipesRouter;
