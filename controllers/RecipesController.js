const jwt = require('jsonwebtoken');
const Recipe = require('../models/RecipesModel');
const CreateRecipesService = require('../services/CreateRecipesService');
const DeleteService = require('../services/DeleteService');
const FindByIdService = require('../services/FindByIdService');
const ListAllService = require('../services/ListAllService');
const UpdateService = require('../services/UpdateService');
const AddImageService = require('../services/AddImageService');

class RecipesController {
  async create(req, res) {
    const recipe = new Recipe();
    const createRecipeService = new CreateRecipesService(recipe);
    console.log(this);
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const payload = jwt.decode(authorization);
    const { _id: userId } = payload;
    const newRecipe = await createRecipeService.execute({ name, ingredients, preparation, userId });
    return res.status(201).json({ recipe: newRecipe });
  }

  async listAll(_req, res) {
    const recipes = new Recipe();
    const listAllService = new ListAllService(recipes);
    const recipesList = await listAllService.execute();
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

  async update(req, res) {
    const recipe = new Recipe();
    const updateService = new UpdateService(recipe);
    console.log(this);
    const { name, ingredients, preparation } = req.body;
    const { authorization } = req.headers;
    const { id } = req.params;
    const payload = jwt.decode(authorization);
    const { _id: userId } = payload;
    await updateService.execute(
      { name, ingredients, preparation, userId, id },
    );
    return res.status(200).json({ name, ingredients, preparation, userId, id });
  }

  async delete(req, res) {
    const recipe = new Recipe();
    const deleteService = new DeleteService(recipe);
    const { id } = req.params;
    console.log(this);
    await deleteService.execute(id);
    return res.status(204).json({ message: 'Ok' });
  }

  async uploadImage(req, res) {
    const recipe = new Recipe();
    const findByIdService = new FindByIdService(recipe);
    const { id } = req.params;
    console.log(id);
    const recipeFound = await findByIdService.execute(id);
    console.log(recipeFound);
    console.log(this);
    const newRecipe = {
      ...recipeFound,
      image: `localhost:3000/images/${id}.jpeg`,
    };
    const addImageService = new AddImageService(recipe);
    await addImageService.execute(newRecipe);
    return res.status(200).json(newRecipe);
  }
}

module.exports = RecipesController;