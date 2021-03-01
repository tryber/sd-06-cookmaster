const rescue = require('express-rescue');
const { RecipesService } = require('../services');

const CREATED = 201;

const registerNewRecipe = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;

  const newRecipe = await RecipesService.registerNewRecipe(name, ingredients, preparation);

  res
    .status(CREATED)
    .json(newRecipe);
});

module.exports = {
  registerNewRecipe,
};
