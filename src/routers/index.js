const express = require('express');
const multer = require('multer');

const router = express.Router();

const controllerUser = require('../controllers/UsersController');
const controllerLogin = require('../controllers/LoginController');
const controllerRecipe = require('../controllers/RecipesController');
const { 
  validateUser,
  validateLogin,
  validateToken,
  validateTokenUpdate,
  validateRecipe,
} = require('../services/Validation');

const recipeId = '/recipes/:id';

// Adicionando Imagem
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Rotas de Usuario
router.get('/users', controllerUser.getUserAll);
router.post('/users', validateUser, controllerUser.createUser);

// Rota de Login
router.post('/login', validateLogin, controllerLogin.login);

// Rota de Receitas
router.get('/recipes', controllerRecipe.getAllRecipes);
router.get(recipeId, controllerRecipe.findByIdRecipe);
router.post('/recipes', validateToken, validateRecipe, controllerRecipe.createRecipe);
router.put(recipeId, validateTokenUpdate, controllerRecipe.updateIdRecipe);
router.delete(recipeId, validateTokenUpdate, controllerRecipe.removeIdRecipe);
router.put('/recipes/:id/image',
  upload.single('image'), validateToken, controllerRecipe.updateIdImage);

module.exports = router;
