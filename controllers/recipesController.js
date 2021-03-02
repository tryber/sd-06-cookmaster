const services = require('../services/recipesServices');

const createRecipes = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const newRecipe = req.body;
    const recipeCreated = await services.createRecipe(token, newRecipe);

    res.status(201).json({ recipe: recipeCreated });
  } catch (err) {
    next(err);
  }
};

module.exports = { createRecipes };
