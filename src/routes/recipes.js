const { Router } = require('express');

const recipesRoutes = Router();

const recipeController = require('../controllers/RecipeController');
const verifyRecipe = require('../middlewares/verifyRecipe');
const uploadImage = require('../middlewares/uploadImage');
const validateJWT = require('../auth/validateJWT');

recipesRoutes.post('/', verifyRecipe.register, validateJWT, recipeController.create);
recipesRoutes.get('/', recipeController.getAll);
recipesRoutes.get('/:id', recipeController.findById);
recipesRoutes.put('/:id', validateJWT, recipeController.update);
recipesRoutes.delete('/:id', validateJWT, recipeController.remove);
recipesRoutes.put('/:id/image/', validateJWT, uploadImage, recipeController.addImage);

module.exports = recipesRoutes;