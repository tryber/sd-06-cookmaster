const { Router } = require('express');
const multer = require('multer');

const uploadConfig = require('../config/upload');

const RecipesController = require('../controllers/RecipesController');
const RecipeImageController = require('../controllers/RecipeImageController');

const ensureAuth = require('../middlewares/ensureAuth');
const validateRecipeData = require('../middlewares/validateRecipeInfo');

const recipesController = new RecipesController();
const recipeImageController = new RecipeImageController();

const upload = multer(uploadConfig.config.disk);

const recipesRoutes = Router();

recipesRoutes.get('/', recipesController.list);
recipesRoutes.get('/:id', recipesController.show);

recipesRoutes.post('/', ensureAuth, validateRecipeData, recipesController.create);

recipesRoutes.put('/:id', ensureAuth, validateRecipeData, recipesController.update);
recipesRoutes.put('/:id/image', ensureAuth, upload.single('image'), recipeImageController.update);

recipesRoutes.delete('/:id', ensureAuth, recipesController.delete);

module.exports = recipesRoutes;
