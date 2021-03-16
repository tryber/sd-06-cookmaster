const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const {
  validateJwt,
  verifyValidToken,
  validateUserRole,
} = require('../services/LoginServices');
const { validateRecipeData } = require('../services/RecipesServices');
const {
  recipeRegister,
  getRecipes,
  getRecipeById,
  updateRecipeById,
  getRecipeOwnerId,
  deleteRecipe,
  addImage,
} = require('../models/Recipes');

const missingAuthToken = 'missing auth token';
const RecipesController = new Router();
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    const fullPath = path.resolve(__dirname, '..', 'uploads');
    callback(null, fullPath);
  },
  filename: (req, _file, callback) => {
    const extension = '.jpeg';
    callback(null, req.params.id.concat(extension));
  },
});
const upload = multer({ storage });

RecipesController.post('/', async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  try {
    const { email, password } = verifyValidToken(token);
    const userId = await validateJwt(email, password);
    const {
      validName, validIngredients, validPreparation,
    } = validateRecipeData(name, ingredients, preparation);
    const registeredRecipe = await recipeRegister(
      validName, validIngredients, validPreparation, userId,
    );

    return res.status(registeredRecipe[1]).json(registeredRecipe[0]);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.get('/', async (_req, res) => {
  const recipes = await getRecipes();

  return res.status(recipes[1]).json(recipes[0]);
});

RecipesController.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await getRecipeById(id);

    return res.status(recipe[1]).json(recipe[0]);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: missingAuthToken });

  try {
    const { email, password } = verifyValidToken(token);
    const currentUserId = await validateJwt(email, password);
    const recipeOwnerId = await getRecipeOwnerId(id);
    await validateUserRole(email, recipeOwnerId, currentUserId);
    const { status } = await updateRecipeById(name, ingredients, preparation, id);

    const updatedRecipe = { name, ingredients, preparation, _id: id, userId: currentUserId };

    return res.status(status).json(updatedRecipe);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: missingAuthToken });

  try {
    const { email, password } = verifyValidToken(token);
    const currentUserId = await validateJwt(email, password);
    const recipeOwnerId = await getRecipeOwnerId(id);
    await validateUserRole(email, recipeOwnerId, currentUserId);
    const result = await deleteRecipe(id);
    return res.status(result).json();
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

RecipesController.put('/:id/image/', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { filename } = req.file;
  const token = req.headers.authorization;
  const recipeImage = `localhost:3000/images/${filename}`;
  if (!token) return res.status(401).json({ message: missingAuthToken });
  
  try {
    const { email, password } = verifyValidToken(token);
    const currentUserId = await validateJwt(email, password);
    const recipeOwnerId = await getRecipeOwnerId(id);
    await validateUserRole(email, recipeOwnerId, currentUserId);
    const result = await addImage(id, recipeImage);
    return res.status(result[1]).json(result[0]);
  } catch (error) {
    return res.status(error[1]).json(error[0]);
  }
});

module.exports = RecipesController;
