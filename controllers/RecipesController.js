const jwt = require('jsonwebtoken');
const Recipe = require('../models/RecipesModel');
const CreateRecipesService = require('../services/CreateRecipesService');
const ListAllService = require('../services/ListAllService');

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

  async listAll(req, res) {
    const recipes = Recipe();
    const listAllService = ListAllService(recipes);
    const recipesList = listAllService.execute();
    console.log(this);
    return res.status(200).json(recipesList);
  }
}

module.exports = RecipesController;