const { ObjectId } = require('mongodb');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const RecipeService = require('../service/RecipeService');

const validateField = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const recipeIsValid = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND)
      .json({ message: 'recipe not found' });
  }

  const recipe = await RecipeService.getById(id);
  if (!recipe) {
    return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  next();
};

module.exports = {
  validateField,
  recipeIsValid,
};
