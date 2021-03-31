const rescue = require('express-rescue');

const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validateRecipes = rescue(async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  const invalidName = name === undefined || name.length === 0;
  const invalidIngredients = ingredients === undefined || ingredients.length === 0;
  const invalidPreparations = preparation === undefined || preparation.length === 0;

  if (invalidName || invalidIngredients || invalidPreparations) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  next();
});

module.exports = { validateRecipes };
