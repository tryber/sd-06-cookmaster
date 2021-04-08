const express = require('express');
const { verifyToken } = require('../middleware/tokenJWT');
const upload = require('../middleware/uploadImage');

const routers = express.Router();

const {
  postBarRecipe,
  getBar,
  getBarId,
  putBarId,
  deleteBarId,
} = require('../services/recipesService');

routers.put('/:id/image/', verifyToken, upload, async (req, res) => {
  const { id } = req.params;
  const { host } = req.headers;
  const pathImage = `${host}/images/${id}.jpeg`;
  try {
    const recipe = await getBarId(id);
    console.log(recipe);
    res.status(200).json({ ...recipe, image: pathImage });
  } catch (error) {
    res.status(error.status).json(error);
  }
});

routers.post('/', verifyToken, async (req, res) => {
  const recipe = req.body;
  const { _id } = req.payload;
  const param = { ...recipe, userId: _id };
  try {
    const { ops } = await postBarRecipe(param);
    res.status(201).json({ recipe: ops[0] });
  } catch (error) {
    res.status(error.status).json(error);
  }
});

routers.get('/', async (_req, res) => {
  try {
    const allrecipes = await getBar();
    res.status(200).json(allrecipes);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

routers.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await getBarId(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

routers.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const upRecipe = req.body;
  const { role, _id: idUser } = req.payload;
  try {
    const recipe = await putBarId(id, upRecipe, role, idUser);
    res.status(200).json(recipe.value);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

routers.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDeleted = await deleteBarId(id);
    res.status(204).json(recipeDeleted);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

module.exports = routers;
