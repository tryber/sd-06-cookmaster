const multer = require('multer');
const { Router } = require('express');
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addImage,
} = require('../middlewares/Recipes');
const {
  recipeValidation,
  idValidation,
  userAndRoleValidation,
} = require('../middlewares/validations/RecipeValidations');
const validateJWT = require('../middlewares/auth/validateJWT');

const recipesRouter = new Router();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/images');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const imageType = file.mimetype.replace('image/', '.');
    callback(null, `${id}${imageType}`);
  },
});

const upload = multer({ storage });

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', idValidation, getRecipeById);
recipesRouter.use(validateJWT);
recipesRouter.post('/', recipeValidation, createRecipe);
recipesRouter.put('/:id', idValidation, userAndRoleValidation, updateRecipe);
recipesRouter.put('/:id/image', idValidation, userAndRoleValidation,
upload.single('image'), addImage);
recipesRouter.delete('/:id', idValidation, userAndRoleValidation, deleteRecipe);

module.exports = recipesRouter;