const jwt = require('jsonwebtoken');
const Recipe = require('../models/RecipesModel');
const CreateRecipesService = require('../services/CreateRecipesService');
const FindByIdService = require('../services/FindByIdService');
const ListAllService = require('../services/ListAllService');

class RecipesController {
  async create(req, res) {
    const recipe = new Recipe();
    const createRecipeService = new CreateRecipesService(recipe);
    console.log(this);
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const payload = jwt.decode(authorization);
    const { _id: userId } = payload;
    const newRecipe = createRecipeService.execute({ name, ingredients, preparation, userId });
    return res.status(200).json(newRecipe);
  }

  async listAll(_req, res) {
    const recipes = new Recipe();
    const listAllService = new ListAllService(recipes);
    const recipesList = listAllService.execute();
    console.log(this);
    return res.status(200).json(recipesList);
  }

  async findById(req, res) {
    const { id } = req.params;
    const recipe = new Recipe();
    const findByIdService = new FindByIdService(recipe);
    console.log(this);
    const recipeFound = await findByIdService.execute(id);
    return res.status(200).json(recipeFound);
  }
}

module.exports = RecipesController;