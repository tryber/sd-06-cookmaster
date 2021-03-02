const { Router } = require('express');
const multer = require('multer');

const { createRecipe, findRecipeById,
  getRecipes, updateRecipe, deleteRecipe } = require('../services/recipesServices');

const { validatePrivilege, findRecipe, validateToken,
  validateRecipe } = require('../middlewares');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './images/');
  },
  filename: (req, file, callback) => {
    // const fileExtension = file.originalname.split('.').pop(); opção que pegaria a extensão original
    const fileExtension = 'jpeg';
    const fileName = req.params.id.concat('.', fileExtension);
    callback(null, fileName);
  },
});

const upload = multer({ storage });

const SUCCESS = 200;
const CREATED = 201;
const NO_CONTENT = 204;
const DFT_ERROR = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

router.put('/:id/image', validateToken, validatePrivilege, findRecipe, upload.single('image'),
  async (req, res) => {
    try {
      const { _id } = req.recipe;
      const image = 'localhost:3000/'.concat(req.file.path);
      const newRecipe = await updateRecipe({ _id, image });

      return res.status(SUCCESS).send(newRecipe);
    } catch (e) {
      console.log(e);
      res.status(DFT_ERROR).send(e);
    }
    res.send().status(200);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await findRecipeById(id);

    if (recipe === false) {
      return res.status(NOT_FOUND).send({
        message: 'recipe not found',
      });
    }

    res.status(SUCCESS).send(recipe);
  } catch (e) {
    console.log(e);
  }
});

router.get('/', async (_req, res) => {
  try {
    const recipes = await getRecipes();

    res.status(SUCCESS).send(recipes);
  } catch (e) {
    res.status(DFT_ERROR).send({
      err: 'invalid_data',
      message: 'Something went awry.',
    });
  }
});

router.post('/', validateToken, validateRecipe, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;
    const newRecipe = await createRecipe({ name, ingredients, preparation, userId: _id });

    return res.status(CREATED).send(newRecipe);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.put('/:id', validateToken, validatePrivilege, validateRecipe, async (req, res) => {
  try {
    const { _id } = req.recipe;
    const { name, ingredients, preparation } = req.body;
    const newRecipe = await updateRecipe({ name, ingredients, preparation, _id });

    return res.status(SUCCESS).send(newRecipe);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.delete('/:id', validateToken, validatePrivilege, async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await findRecipeById(id);

    if (recipe === false) {
      return res.status(UNPROCESSABLE).send({
        message: 'recipe not found',
      });
    }
    await deleteRecipe(id);
    res.status(NO_CONTENT).send();
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;