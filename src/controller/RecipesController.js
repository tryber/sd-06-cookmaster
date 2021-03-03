const { Router } = require('express');
const multer = require('multer');
const Recipes = require('../service/RecipesService');
const { createValidation, findByIdValidation } = require('../schemas/RecipesValidation');
const verifyToken = require('../schemas/verifyAuthorization');

const storage = multer.diskStorage({
  destination: (_req, _file, calback) => {
    calback(null, 'uploads');
  },
  filename: (req, _file, calback) => {
    calback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const router = new Router();

const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const INTERNAL_ERROR_MESSAGE = { message: 'Internal Server Error' };

router.get('/', async (_req, res) => {
  try {
    const allRecipes = await Recipes.getAll();

    return res.status(OK).json(allRecipes);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
});

router.get('/:id', findByIdValidation, async (req, res) => {
  try {
    const { id } = req.params;

    const fetchedRecipe = await Recipes.findById(id);

    if (!fetchedRecipe) {
      return res.status(NOT_FOUND).json({ message: 'recipe not found' });
    }

    return res.status(OK).json(fetchedRecipe);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
});

router.post('/', verifyToken, createValidation, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const id = req.user;

    const newPost = await Recipes.create(name, ingredients, preparation, id);

    return res.status(CREATED).json({ recipe: newPost });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;

    await Recipes.update(id, name, ingredients, preparation);

    const modifiedRecipe = await Recipes.findById(id);

    return res.status(OK).json(modifiedRecipe);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  await Recipes.remove(id);

  return res.status(NO_CONTENT).end();
});

router.put('/:id/image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { path } = req.file;

    const imagePath = `localhost:3000/images/${id}.jpeg`;

    await Recipes.uploadImage(id, imagePath);

    const updatedRecipe = await Recipes.findById(id);

    return res.status(200).json(updatedRecipe);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json(INTERNAL_ERROR_MESSAGE);
  }
});

module.exports = router;
