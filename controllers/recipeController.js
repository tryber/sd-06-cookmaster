const express = require('express');
const multer = require('multer');

const {
  addRecipe,
  getRecipeById,
  addImageToRecipe,
  getAllRecipes,
  updateRecipe,
  deleteRecipeById,
} = require('../models/recipeModel');
const {
  validatePresenceOfNameIngredientsPreparation,
  validateRecipeExistsById,
  validateJWTToUpdate,
  validateJWTBasic,
} = require('../middlewares/validation');

const storage = multer.diskStorage({
  destination: 'images',
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const storeImage = [
  upload.single('image'),
  (req, res, next) => {
    next();
  },
];

const router = express.Router();

router.put(
  '/:id/image',
  validateRecipeExistsById,
  validateJWTToUpdate,
  storeImage,
  async (req, res) => {
    try {
      addImageToRecipe(req.params.id);
      const recipe = await getRecipeById(req.params.id);
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(501).json({
        message: 'Erro ao adicionar imagem a receita',
        error,
      });
    }
  },
);

router.post(
  '/',
  validateJWTBasic,
  validatePresenceOfNameIngredientsPreparation,
  async (req, res) => {
    const id = req.data['_id'];
    try {
      const { name, ingredients, preparation } = req.body;
      const recipe = await addRecipe(id, name, ingredients, preparation);
      return res.status(201).json({ recipe });
    } catch (error) {
      return res.status(501).json({
        message: 'Erro ao salvar a receita no banco',
        error,
      });
    }
  },
);

router.get('/', async (_, res) => {
  try {
    const recipes = await getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(501).json({
      message: 'Erro ao puxar todas receitas',
      error,
    });
  }
});

router.get('/:id', validateRecipeExistsById, async (req, res) => {
  try {
    const recipe = await getRecipeById(req.params.id);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(501).json({
      message: 'Erro ao baixar essa receita',
      error,
    });
  }
});

router.put(
  '/:id',
  validateRecipeExistsById,
  validateJWTToUpdate,
  async (req, res) => {
    try {
      const { name, ingredients, preparation } = req.body;
      const recipeUpdated = await updateRecipe(
        req.params.id,
        name,
        ingredients,
        preparation,
      );
      return res.status(200).json(recipeUpdated);
    } catch (error) {
      return res.status(501).json({
        message: 'Erro ao atualizar essa receita',
        error,
      });
    }
  },
);

router.delete(
  '/:id',
  validateRecipeExistsById,
  validateJWTToUpdate,
  async (req, res) => {
    try {
      await deleteRecipeById(req.params.id);
      return res.status(204).json({
        message: 'Ok',
      });
    } catch (error) {
      return res.status(501).json({
        message: 'Erro ao deletar essa receita',
        error,
      });
    }
  },
);

module.exports = router;
