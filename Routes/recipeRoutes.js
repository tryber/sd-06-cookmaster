const { Router } = require('express');
const controllers = require('../Controllers/recipeControllers');
const validateRecipe = require('../Middlewares/validateRecipe');
const validateToken = require('../Middlewares/validateToken');
const verifyToken = require('../auth/verifyToken');

const router = new Router();

router.post('/', validateRecipe, validateToken, async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;

  const { _id } = verifyToken(token);

  const newRecipe = await controllers.create(_id, name, ingredients, preparation);

  return res.status(201).send(newRecipe);
});

module.exports = router;
