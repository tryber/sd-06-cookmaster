const uploadConfig = require('../config/upload');

const AppError = require('../errors/AppError');
const { NOT_FOUND, UNAUTHORIZED } = require('../errors/status');

const notFoundError = 'recipe not found';
const unError = 'user unauthorized to update this recipe';

class UpdateRecipeImageService {
  constructor(RecipeModel, StorageProvider) {
    this.RecipeModel = RecipeModel;
    this.StorageProvider = StorageProvider;
  }

  async execute({ recipeId, role, userId, image }) {
    this.count += 1;

    const recipe = await this.RecipeModel.findByID(recipeId);

    if (!recipe) throw new AppError(notFoundError, NOT_FOUND);

    if (recipe.userId !== userId && role !== 'admin') throw new AppError(unError, UNAUTHORIZED);

    if (recipe.image) await this.StorageProvider.deleteFile(recipe.image);

    const imageName = await this.StorageProvider.saveFile(image);
    const imageFullPath = `${uploadConfig.config.disk.baseURL}/${imageName}`;

    const updatedRecipe = await this.RecipeModel.updateImage({ recipeId, image: imageFullPath });

    return updatedRecipe;
  }
}

module.exports = UpdateRecipeImageService;
