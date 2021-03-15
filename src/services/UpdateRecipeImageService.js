const { Recipes } = require('../database/index');
const AppError = require('../utils/AppError');

const { NOT_FOUND, UNAUTHORIZED } = require('../utils/errorStatus');

const deleteFile = require('../utils/DiskStorage');
const uploadConfig = require('../config/upload');

class UpdateRecipeImageService {
  async execute({ recipeId, userId, role, image }) {
    this.count += 1;
    const recipesModel = new Recipes();
    const recipeFound = await recipesModel.findById(recipeId);

    if (!recipeFound) throw new AppError('recipe not found', NOT_FOUND);

    if (recipeFound.userId !== userId && role !== 'admin') {
      throw new AppError('unauthorized user, cannot update recipe', UNAUTHORIZED);
    }

    if (recipeFound.image) await deleteFile(recipeFound.image);

    const imageFullPath = `${uploadConfig.baseURL}/${image}`;
    const recipeCreated = await recipesModel.updateImage(recipeId, imageFullPath);

    return recipeCreated;
  }
}

module.exports = UpdateRecipeImageService;
