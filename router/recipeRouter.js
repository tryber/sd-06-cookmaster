const { Router } = require('express');
const multer = require('multer');

const validateToken = require('../token/validateToken');
const validation = require('../validator/recipeValidator');
const controller = require('../controllers/recipeController');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },   
});
const upload = multer({ storage });

const recipesRouter = new Router();

recipesRouter.post(
  '/',
  validation.name,
  validation.ingredients,
  validation.preparation,
  validateToken,
  controller.createNewRecipe,
);

recipesRouter.get('/', controller.getAllRecipes);
recipesRouter.get('/:id', controller.getRecipeById);

recipesRouter.put('/:id', validateToken, controller.editRecipe);

recipesRouter.delete('/:id', validateToken, controller.deleteRecipe);

recipesRouter.put('/:id/image', validateToken, upload.single('image'), controller.uploadFile);

module.exports = { recipesRouter };
