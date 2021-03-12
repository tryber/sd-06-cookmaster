const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const recipeService = require('../services/recipesService');

const recipesEntriesValidation = require('../middlewares/recipesEntriesValidation');
const { validateToken } = require('../auth/validateToken');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const IdValidation = require('../middlewares/idValidation');

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const OK = 200;

router.get('/', async (_req, res) => {
  const recipes = await recipeService.getAll();

  res.status(OK).json(recipes);
});

router.get('/:id', IdValidation, async (req, res) => {
  const { id } = req.params;

  const recipe = await recipeService.findById(id);

  res.status(OK).json(recipe);
});

router.post('/', verifyAuthorization, recipesEntriesValidation, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  
  const { authorization: token } = req.headers;

  const payload = await validateToken(token);
  const { _id: userId } = payload;

  const { insertedId } = await recipeService.create(name, ingredients, preparation, userId);
  
  const recipe = {
    _id: insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };

  res.status(201).json({ recipe });
});

router.put('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  await recipeService.update(id, name, ingredients, preparation);
  
  const editedRecipe = await recipeService.findById(id);

  res.status(OK).json(editedRecipe);
});

router.delete('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;

  const recipeToDelete = await recipeService.findById(id);

  await recipeService.remove(id);

  res.status(204).json(recipeToDelete);
});

router.put('/:id/image/', verifyAuthorization, upload.single('file'), async (req, res) => {
  const { params, file, headers } = req;
  const extname = path.extname(file.originalname);
  const imagePath = `${headers.host}/images/${req.params.id}${extname}`;
  
  await recipeService.updateRecipeWithImage(params.id, imagePath);

  const editedRecipeWithImage = await recipeService.findById(params.id);

  res.status(200).json({ editedRecipeWithImage });
});

module.exports = router;