const { Router } = require('express');
const RecipesController = require('../controllers/RecipesController');
const verifyAuthorization = require('../middlewares/verifyAuthorization');

const recipesRouter = Router();

const recipesController = new RecipesController();

recipesRouter.post('/', verifyAuthorization, recipesController.create);

recipesRouter.get('/', recipesController.listAll);

recipesRouter.get('/:id', recipesController.findById);

module.exports = recipesRouter;