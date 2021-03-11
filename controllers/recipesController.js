const { Router } = require('express');
const multer = require('multer');
const { validateToken,
  recipeCreate,
  validateRecipe,
  getAllRecipes, 
  getRecipeById, 
  validateId, 
  recipeUpdate, 
  recipeDelete, 
  updateImage, 
  canUserEdit } = require('../services/recipesServices');
const { findOneUser } = require('../models/usersModel');
const { CREATED, SUCCESS, NOTFOUND, DELETED, NOTADMIN } = require('../variables');

const recipesRouter = new Router();

recipesRouter.post('/', validateToken, validateRecipe, async (req, res) => {
  const { email } = req.user;
  const user = await findOneUser(email);
  const { _id } = user;
  const recipe = {
    ...req.body,
    userId: _id,
  };
  await recipeCreate(recipe);

  res.status(CREATED).json({ recipe });
});

recipesRouter.get('/', async (_req, res) => {
  const recipes = await getAllRecipes();

  res.status(SUCCESS).json(recipes);
});

recipesRouter.get('/:id', validateId, async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(NOTFOUND).json({ message: 'recipe not found' });

  res.status(SUCCESS).json(recipe);
});

recipesRouter.put('/:id', validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { email } = req.user;

  const userAuthorization = await canUserEdit(id, email);

  if (!userAuthorization) {
    return res.status(NOTADMIN).json({ message: `${email} can't edit this recipe` });
  }

  await recipeUpdate(id, name, ingredients, preparation);
  const recipeUpdated = await getRecipeById(id);

  res.status(SUCCESS).json(recipeUpdated);
});

recipesRouter.delete('/:id', validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const recipe = await getRecipeById(id);

  const userAuthorization = await canUserEdit(id, email);

  if (!userAuthorization) {
    return res.status(NOTADMIN).json({ message: `${email} can't edit this recipe` });
  }

  if (recipe) {
    await recipeDelete(id);
    res.status(DELETED).send();
  } else {
    res.status(NOTFOUND).json({ message: 'recipe not found' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

recipesRouter.put('/:id/image', upload.single('image'),
   validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const userAuthorization = await canUserEdit(id, email);

  if (!userAuthorization) {
    return res.status(NOTADMIN).json({ message: `${email} can't edit this recipe` });
  }
  const path = `localhost:3000/images/${req.file.filename}`;

  const recipeUpdated = await updateImage(id, path);
  res.status(SUCCESS).json(recipeUpdated);
});

module.exports = { recipesRouter };
