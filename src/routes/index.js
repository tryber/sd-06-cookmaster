const { Router } = require('express');
const appRoutes = Router();

const userController = require('../controllers/UserController');
const recipeController = require('../controllers/RecipeController');
const verifyUser = require('../middlewares/verifyUser');
const verifyRecipe = require('../middlewares/verifyRecipe');
const uploadImage = require('../middlewares/uploadImage');
const generateJWT = require('../auth/generateJWT');
const validateJWT = require('../auth/validateJWT');

appRoutes.post('/users', verifyUser.register, userController.create);
appRoutes.get('/users', userController.getAll);

appRoutes.post('/login', verifyUser.login, generateJWT);

appRoutes.post('/recipes', verifyRecipe.register, validateJWT, recipeController.create);
appRoutes.get('/recipes', recipeController.getAll);
appRoutes.get('/recipes/:id', recipeController.findById);
appRoutes.put('/recipes/:id', validateJWT, recipeController.update);
appRoutes.delete('/recipes/:id', validateJWT, recipeController.remove);
appRoutes.put('/recipes/:id/image/', validateJWT, uploadImage, recipeController.addImage);

module.exports = appRoutes;