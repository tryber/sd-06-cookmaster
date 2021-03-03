const jwt = require('jsonwebtoken');
const Recipe = require('../models/RecipesModel');
const CreateRecipesService = require('../services/CreateRecipesService');

const secret = 'mysecret';

class RecipesController {
  async create(req, res) {
    const recipe = Recipe();
    const createRecipeService = CreateRecipesService(recipe);
    console.log(this);
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const payload = jwt.verify(authorization, secret);
    const { _id: userId } = payload;
    const newRecipe = createRecipeService.execute({ name, ingredients, preparation, userId });
    return res.status(200).json(newRecipe);
  }
}

module.exports = RecipesController;