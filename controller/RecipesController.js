const { Router } = require('express');
const { ObjectId } = require('mongodb');
const multer = require('multer');
const RecipesService = require('../service/RecipesService');
const validateJWT = require('../auth/validateJWT');
const validateJWTRecipe = require('../auth/validateJWTRecipe');

const router = Router();

const invalid = 'Invalid entries. Try again.';

const recipesId = '/recipes/:id';

router.post('/recipes', validateJWT, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;

  if (!name) return res.status(400).json({ message: invalid });
  if (!ingredients) return res.status(400).json({ message: invalid });
  if (!preparation) return res.status(400).json({ message: invalid });

  const result = await RecipesService.createRecipe(name, ingredients, preparation, userId);

  return res.status(201).json({ recipe: result });
});

router.get('/recipes', async (req, res) => {
  const allRecipes = await RecipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
});

router.get(recipesId, async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).json({ message: 'recipe not found' });

  const recipe = await RecipesService.getRecipeById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  return res.status(200).json(recipe);
});

router.put(recipesId, validateJWTRecipe, async (req, res) => {
  const { id } = req.params;  
  const { name, ingredients, preparation } = req.body;

  await RecipesService.editRecipe(id, name, ingredients, preparation);
  
  const result = await RecipesService.getRecipeById(id);

  return res.status(200).json(result);  
});

router.delete(recipesId, validateJWTRecipe, async (req, res) => {
  const { id } = req.params;

  await RecipesService.deleteRecipe(id);

  return res.status(204).end();
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, req.params.id);
  },
});

const upload = multer({ storage });

router.put('/recipes/:id/image/', validateJWTRecipe, upload.single('image'), async (req, res) => {
  const { id } = req.params;

  const image = `localhost:3000/images/${id}.jpeg`;

  await RecipesService.addImagePath(id, image);

  const result = await RecipesService.getRecipeById(id);
  console.log(result)

  return res.status(200).json(result);
});

module.exports = router;