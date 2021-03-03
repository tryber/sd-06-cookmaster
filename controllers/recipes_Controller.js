const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const {
  getAllRecipes,
  createRecipe,
  findRecipeById,
  editRecipeById,
  deleteRecipeById,
  uploadRecipeImage,
  validateCreateRecipe,
  validateFindById,
  validateAuth,
} = require('../services/recipes_Service');

const router = express.Router();

const OK = 200;
const Created = 201;
const NoContent = 204;

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.get('/', async (_req, res) => {
  const recipe = await getAllRecipes();

  res.status(OK).json(recipe);
});

router.post('/', validateCreateRecipe, async (req, res) => {
  const token = req.headers.authorization;
  const secret = 'milhoComLevesTonsDeVerdeMesmoSendoBemAmarelado';
  const decoded = jwt.verify(token, secret);
  const { _id } = decoded.data;

  const newRecipe = await createRecipe(req.body, _id);

  res.status(Created).json(newRecipe);
});

router.get('/:id', validateFindById, async (req, res) => {
  const { id } = req.params;
  const foundRecipe = await findRecipeById(id);

  res.status(OK).json(foundRecipe);
});

router.put('/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  await editRecipeById(id, name, ingredients, preparation);
  const editedRecipe = await findRecipeById(id);

  res.status(OK).json(editedRecipe);
});

router.delete('/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  await deleteRecipeById(id);
  
  res.status(NoContent).send();
});

router.put('/:id/image', upload.single('image'), validateAuth, async (req, res) => {
  const { id } = req.params;

  const result = await uploadRecipeImage(id);
  
  res.status(OK).json(result);
});

module.exports = router;
