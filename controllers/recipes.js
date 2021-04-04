const express = require('express');
const { verifyToken } = require('../middleware/tokenJWT');

const routers = express.Router();

const {
  postBarRecipe,
  getBar,
} = require('../services/recipesService');

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
  console.log(res);
  try {
    const allrecipes = await getBar();
    res.status(200).json(allrecipes);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

module.exports = routers;
