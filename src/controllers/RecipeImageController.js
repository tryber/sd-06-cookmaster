const Recipe = require('../database/models/Recipe');

const StorageProvider = require('../providers/StorageProvider');

const UpdateRecipeImageService = require('../services/UpdateRecipeImageService');

class RecipesImageController {
  async update(request, response) {
    this.count += 1;
    const { id: recipeId } = request.params;
    const { id: userId, role } = request.user;
    const { filename } = request.file;

    const recipeModel = new Recipe();
    const storageProvider = new StorageProvider();
    const updateRecipeService = new UpdateRecipeImageService(recipeModel, storageProvider);

    const recipeToUpdate = { recipeId, role, userId, image: filename };

    const updatedRecipe = await updateRecipeService.execute(recipeToUpdate);

    const UPDATED = 200;

    return response.status(UPDATED).json(updatedRecipe);
  }
}

module.exports = RecipesImageController;
