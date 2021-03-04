const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const service = require('../service/RecipeService');
const { validateUserToken, validateUserTokenUpdate } = require('../middlewares/TokenMiddleware'); 
const { validateRecipe } = require('../middlewares/RecipeMiddleware');

const RecipeController = new Router();
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    // callback(null, file.originalname);
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Get All Recipes
RecipeController.get('/', async (req, res) => {
  const recipes = await service.getAll();

  res.status(OK).json(recipes);
});

// Get Recipe by ID
RecipeController.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(id)) {
    const recipe = await service.findById(id);
    if (recipe) {
      return res.status(OK).json(recipe);
    }
  }
  res.status(NOT_FOUND).json({ message: 'recipe not found' });
});

// Create New Recipe
RecipeController.post('/', validateUserToken, validateRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  const recipe = await service.create(name, ingredients, preparation, userId);

  res.status(CREATED).json(recipe);
});

// Add Image Recipe
RecipeController.put('/:id/image', 
    validateUserToken, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/images/${id}.jpeg`;

  const recipe = await service.findById(id);
  if (recipe) {
    const updatedRecipe = await service.updateImage(recipe, image);
    return res.status(OK).json(updatedRecipe);
  }
  res.status(NOT_FOUND).json({ message: 'recipe not found' });
});

// Update Recipe
RecipeController.put('/:id', validateUserTokenUpdate, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const { id } = req.params;

  const recipe = await service.update({ id, userId }, name, ingredients, preparation);

  res.status(OK).json(recipe);
});

// Remove Recipe
RecipeController.delete('/:id', validateUserTokenUpdate, async (req, res) => {
  const { id } = req.params;

  await service.remove(id);

  res.status(NO_CONTENT).json();
});

module.exports = RecipeController;
