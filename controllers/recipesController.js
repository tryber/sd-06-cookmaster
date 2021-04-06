const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { recipesValidation, validateToken } = require('../middlewares/Recipes');
const { getAllService, createService } = require('../services/recipesService');

const routerRecipes = Router();

const secret = 'senha12345';

const SUCCESS = 200;
const CREATE = 201;

routerRecipes.get('/', async (_req, res) => {
  const getAll = await getAllService();
  return res.status(SUCCESS).json(getAll);
});

routerRecipes.post('/', recipesValidation, validateToken, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  const payload = jwt.verify(token, secret, {
    iss: 'Cookmaster',
    aud: 'identity',
  });

  const { _id: userID } = payload.userData;
  const recipeCreate = await createService(name, ingredients, preparation, userID);
  return res.status(CREATE).json({ recipe: recipeCreate });
});

module.exports = routerRecipes;
