const express = require('express');
const multer = require('multer');

const validateToken = require('../authentication/validateToken');

const recipesController = require('./recipesController');

const recipesRouter = express.Router();

recipesRouter.post('/', validateToken, recipesController.createRecipe);

recipesRouter.get('/', recipesController.getAllRecipes);

recipesRouter.get('/:id', recipesController.findById);

recipesRouter.put('/:id', validateToken, recipesController.updateRecipe);

recipesRouter.delete('/:id', validateToken, recipesController.removeRecipe);

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './images');
  },
  filename: (request, file, callback) => {
    callback(null, `${request.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipesRouter.put(
  '/:id/image',
  validateToken,
  upload.single('image'),
  recipesController.includeImage,
);

module.exports = recipesRouter;
