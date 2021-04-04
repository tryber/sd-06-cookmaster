const { Router } = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
    filename: (req, file, callback) => {
      callback(null, 
        `${JSON.stringify(req.params.id).replace(/"/g, '')}.jpeg`); // path.extname(file.originalname)
  },
});

const upload = multer({ storage });

const { verifyAuthorization } = require('../auth/verifyAuthorization');
const recipesController = require('../controllers/RecipesController');

const recipeRoutes = Router();

recipeRoutes.post('/', verifyAuthorization, recipesController.createRecipeController);
recipeRoutes.get('/', recipesController.findAllRecipesController);
recipeRoutes.get('/:id', recipesController.findRecipeByIdController);
recipeRoutes.put('/:id', verifyAuthorization, recipesController.updateRecipeController);
recipeRoutes.delete('/:id', verifyAuthorization, recipesController.deleteRecipeByIdController);

recipeRoutes.put('/:id/image', 
  verifyAuthorization,
  upload.single('image'),
  recipesController.insertImageController);

module.exports = recipeRoutes;