const { getAllRecipes } = require('../models/recipesModel');

async function getRecipesMiddleware(req, res, next) {
  try {
    const recipes = await getAllRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Internal error' });
  }
  return next();
}

module.exports = getRecipesMiddleware;
