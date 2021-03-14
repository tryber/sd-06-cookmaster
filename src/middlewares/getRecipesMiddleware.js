const { getAllRecipes } = require('../models/recipesModel');

async function getRecipesMiddleware(req, res, _next) {
  try {
    const recipes = await getAllRecipes();
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(500).json({ message: 'Internal error' });
  }
}

module.exports = getRecipesMiddleware;
