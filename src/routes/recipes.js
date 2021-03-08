const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../config/upload');

const RecipesController = require('../controllers/RecipesController'); 

const ensureAuth = require('../middlewares/ensureAuth');

const validateRecipeObj = require('../middlewares/validateRecipeObj');

const upload = multer(uploadConfig);

const recipesRouter = Router();

const recipesController = new RecipesController();

recipesRouter.get('/', recipesController.list);
recipesRouter.get('/:id', recipesController.show);
recipesRouter.post('/', ensureAuth, validateRecipeObj, recipesController.create);
recipesRouter.put('/:id', ensureAuth, validateRecipeObj, recipesController.update);
recipesRouter.put('/:id/image', ensureAuth, upload.single('image'), recipesController.updateImage);
recipesRouter.delete('/:id', ensureAuth, recipesController.delete);

module.exports = recipesRouter;
