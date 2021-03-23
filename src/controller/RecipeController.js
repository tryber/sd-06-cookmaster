const { Router } = require('express');
const multer = require('multer');
const { CREATED, NO_CONTENT, OK } = require('../dictionary/statusCodes');
const RecipeService = require('../service/RecipeService');
const {
  validateRecipeExistence,
  validateRecipeMandatoryFields,
  validateToken,
} = require('../middleware/validations');
const { getUserId } = require('../service/UserService');

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'images');
  },
  filename: (request, file, callback) => {
    callback(null, `${request.params.id}.jpeg`);
  },
});
const upload = multer({ storage });
const RecipeController = new Router();

RecipeController.post(
  '/',
  validateToken,
  validateRecipeMandatoryFields,
  async (request, response) => {
    const recipe = request.body;
    const createdRecipe = await RecipeService.createRecipe(recipe);

    response.status(CREATED).json(createdRecipe);
  },
);

RecipeController.get(
  '/',
  async (_request, response) => {
    const foundRecipes = await RecipeService.findAll();

    response.status(OK).json(foundRecipes);
  },
);

RecipeController.get(
  '/:id',
  validateRecipeExistence,
  async (request, response) => {
    const { id } = request.params;

    const foundRecipe = await RecipeService.findById(id);

    response.status(OK).json(foundRecipe);
  },
);

RecipeController.put(
  '/:id',
  validateToken,
  async (request, response) => {
    const recipe = request.body;
    const { id } = request.params;
    recipe.id = id;

    await RecipeService.updateRecipe(recipe);

    response.status(OK).json(recipe);
  },
);

RecipeController.delete(
  '/:id',
  validateToken,
  validateRecipeExistence,
  async (request, response) => {
    const { id } = request.params;

    const recoveredRecipe = await RecipeService.findById(id);
    await RecipeService.removeRecipe(id);

    response.status(NO_CONTENT).json(recoveredRecipe);
  },
);

RecipeController.put(
  '/:id/image',
  validateToken,
  upload.single('image'),
  async (request, response) => {
    const { id } = request.params;
    const userId = await getUserId(request);
    const recipe = await RecipeService.findById(id);
    const updatedRecipe = {
      _id: id,
      name: recipe.name,
      ingredients: recipe.ingredients,
      preparation: recipe.preparation,
      userId,
      image: `localhost:3000/${request.file.path}`,
    };

    await RecipeService.addImageToRecipe(updatedRecipe);

    response.status(OK).json(updatedRecipe);
  },
);

module.exports = RecipeController;