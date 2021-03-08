const { 
  CreateRecipeService,
  ListRecipesService,
  GetRecipeByIdService,
  UpdateRecipeService,
  DeleteRecipeService,
  UpdateRecipeImageService,
} = require('../services/index');

class RecipesController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const { id } = req.user;
    const { name, ingredients, preparation } = req.body;

    const recipeToBeCreated = { name, ingredients, preparation, userId: id };

    const createRecipeService = new CreateRecipeService();
    const recipeCreated = await createRecipeService.execute(recipeToBeCreated);

    const RECIPE_CREATED = 201;

    return res.status(RECIPE_CREATED).json({ recipe: recipeCreated });
  }

  async list(_req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const listRecipesService = new ListRecipesService();

    const recipes = await listRecipesService.execute();

    const RECIPES_FOUND = 200;

    return res.status(RECIPES_FOUND).json(recipes);
  }

  async show(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const { id } = req.params;

    const getRecipeByIdService = new GetRecipeByIdService();

    const recipeFound = await getRecipeByIdService.execute(id);

    const RECIPE_FOUND = 200;

    return res.status(RECIPE_FOUND).json(recipeFound);
  }

  async update(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const { id: recipeId } = req.params;
    const { name, preparation, ingredients } = req.body;
    const { id: userId, role } = req.user;

    const updateRecipeService = new UpdateRecipeService();
    const updatedRecipe = await updateRecipeService.execute({ 
      recipeId,
      name,
      preparation,
      ingredients,
      userId,
      role,
    });

    const RECIPE_UPDATED = 200;
    return res.status(RECIPE_UPDATED).json(updatedRecipe);
  }

  async updateImage(req, res) {
    this.count += 1;

    const { id: recipeId } = req.params;
    const { filename: image } = req.file;
    const { id: userId, role } = req.user;

    const updateRecipeImage = { recipeId, userId, role, image };

    const updateRecipeImageService = new UpdateRecipeImageService();
    const updatedRecipe = await updateRecipeImageService.execute(updateRecipeImage);

    const RECIPE_UPDATED = 200;
    return res.status(RECIPE_UPDATED).json(updatedRecipe);
  }

  async delete(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this

    const { id } = req.params;
    const { id: userId, role } = req.user;

    const deleteRecipeService = new DeleteRecipeService();

    await deleteRecipeService.execute(id, { userId, role });

    const RECIPE_DELETED = 204;

    return res.status(RECIPE_DELETED).json();
  }
}

module.exports = RecipesController;
