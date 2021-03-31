const { BAD_REQUEST } = require('../dictionary/StatusCode');
const { INVALID_ENTRIES } = require('../dictionary/ErrorMessage');

const name = (req, res, next) => {
  const recipeName = req.body.name;

  if (!recipeName) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  next();
};

const ingredients = (req, res, next) => {
  const recipeIngredients = req.body.ingredients;

  if (!recipeIngredients) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  next();
};

const preparation = (req, res, next) => {
  const recipePreparation = req.body.preparation;

  if (!recipePreparation) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  next();
};

module.exports = {
  name,
  ingredients,
  preparation,
};