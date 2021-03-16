const AppError = require('../errors/AppError');
const { NOT_FOUND } = require('../errors/status');

class FindRecipeByIDService {
  constructor(RecipeModel) {
    this.RecipeModel = RecipeModel;
  }

  async execute(id) {
    const recipeInfo = await this.RecipeModel.findByID(id);

    if (!recipeInfo) {
      const message = 'recipe not found';

      throw new AppError(message, NOT_FOUND);
    }

    return recipeInfo;
  }
}

module.exports = FindRecipeByIDService;
