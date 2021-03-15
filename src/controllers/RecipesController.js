// const User = require('../database/models/User');
const Recipe = require('../database/models/Recipe');

const CreateRecipeService = require('../services/CreateRecipeService');
const ListRecipesService = require('../services/ListRecipesService');
const FindRecipeByIDService = require('../services/FindRecipeByIDService');
const UpdateRecipeService = require('../services/UpdateRecipeService');
const DeleteRecipeByIDService = require('../services/DeleteRecipeByIDService');

class RecipesController {
  async create(request, response) {
    this.count += 1;
    const { name, preparation, ingredients } = request.body;
    const { id } = request.user;

    const recipeModel = new Recipe();
    const createRecipeService = new CreateRecipeService(recipeModel);

    const recipeToCreate = { name, preparation, ingredients, userId: id };

    const newRecipe = await createRecipeService.execute(recipeToCreate);

    const CREATED = 201;

    return response.status(CREATED).json({ recipe: newRecipe });
  }

  async list(_request, response) {
    this.count += 1;
    const recipeModel = new Recipe();
    const listRecipesService = new ListRecipesService(recipeModel);

    const recipes = await listRecipesService.execute();

    const SUCCESS = 200;

    return response.status(SUCCESS).json(recipes);
  }

  async show(request, response) {
    this.count += 1;
    const { id: recipeId } = request.params;

    const recipeModel = new Recipe();
    const findRecipeByIDService = new FindRecipeByIDService(recipeModel);

    const recipe = await findRecipeByIDService.execute(recipeId);

    const SUCCESS = 200;

    return response.status(SUCCESS).json(recipe);
  }

  async update(request, response) {
    this.count += 1;
    const { id: recipeId } = request.params;
    const { name, preparation, ingredients } = request.body;
    const { id: userId, role } = request.user;

    const recipeModel = new Recipe();
    const updateRecipeService = new UpdateRecipeService(recipeModel);

    const recipeToUpdate = { recipeId, name, preparation, ingredients, role, userId };

    const updatedRecipe = await updateRecipeService.execute(recipeToUpdate);

    const UPDATED = 200;

    return response.status(UPDATED).json(updatedRecipe);
  }

  async delete(request, response) {
    this.count += 1;
    const { id: recipeId } = request.params;
    const { id: userId, role } = request.user;

    const recipeModel = new Recipe();
    const deleteRecipeService = new DeleteRecipeByIDService(recipeModel);

    const toDeleteInfo = { recipeId, role, userId };

    await deleteRecipeService.execute(toDeleteInfo);

    const DELETED = 204;

    return response.status(DELETED).send();
  }
}

module.exports = RecipesController;
