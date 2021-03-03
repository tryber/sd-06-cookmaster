// const { ObjectID } = require('mongodb');
const { Router } = require('express');
const {
  createRecipes,
  // getAllRecipes,
  // getRecipeById,
  // editRecipeById,
  // deleteRecipe,
} = require('../models');
const verifyRecipe = require('../middlewares/recipes');
const tokenMiddleware = require('../middlewares/token');

const recipesRouter = Router();

recipesRouter.post('/', tokenMiddleware, verifyRecipe, async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.payload.user;
    const recipe = await createRecipes({ name, ingredients, preparation, userId });
    if (recipe) {
      return res.status(201).json(recipe);
    }
  } catch (err) {
    res.status(401).json({ message: 'jwt malformed' });
  }
});

module.exports = recipesRouter;
