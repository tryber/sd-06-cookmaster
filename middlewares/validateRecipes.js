const rescue = require('express-rescue');

const { BAD_REQUEST } = require('../utils/statusCodeHandler');

const validateRecipes = rescue(async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;

  if (!name || !ingredients || !preparation) {
    return response.status(BAD_REQUEST.code).json({ message: BAD_REQUEST.message });
  }

  next();
});

module.exports = { validateRecipes };
