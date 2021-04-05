const { Router } = require('express');
const RecipesController = require('../controllers/RecipesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipesRouter = Router();

const recipesController = new RecipesController();

recipesRouter.get('/:id', recipesController.findById);

recipesRouter.put('/:id', verifyAuthorization, recipesController.update);

recipesRouter.delete('/:id', verifyAuthorization, recipesController.delete);

recipesRouter.post('/', verifyAuthorization, recipesController.create);

recipesRouter.get('/', recipesController.listAll);

module.exports = recipesRouter;