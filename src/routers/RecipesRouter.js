const { Router } = require('express');
const multer = require('multer');

const { validateRecipeFields, authorization } = require('../middlewares');
const { RecipesController } = require('../controllers');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const RecipeRouter = Router();
const uploads = multer({ storage });

RecipeRouter.post('/',
  validateRecipeFields,
  authorization,
  RecipesController.registerNewRecipe);
RecipeRouter.get('/', RecipesController.listAllRecipes);
RecipeRouter.get('/:id', RecipesController.listRecipeById);
RecipeRouter.put('/:id',
  authorization,
  RecipesController.editRecipe);
RecipeRouter.put('/:id/image',
  authorization,
  uploads.single('image'),
  RecipesController.addNewImage);
RecipeRouter.delete('/:id',
  authorization,
  RecipesController.deleteRecipe);

module.exports = RecipeRouter;
