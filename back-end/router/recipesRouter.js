const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const recipesController = require('../controllers/recipesController');
const { 
  registerRecipeValidator,
  tokenValidator,
} = require('../middlewares/validations/validations');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '..', 'assets/uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const recipesRouter = new Router();

recipesRouter.post('/', registerRecipeValidator, recipesController.registerRecipe);

recipesRouter.get('/', recipesController.getAllRecipes);

recipesRouter.put(
  '/:id/image', tokenValidator, upload.single('image'), recipesController.addImageToRecipe,
);

recipesRouter.get('/:id', recipesController.getRecipesById);

recipesRouter.put('/:id', tokenValidator, recipesController.updateRecipe);

recipesRouter.delete('/:id', tokenValidator, recipesController.deleteRecipeById);

module.exports = recipesRouter;
