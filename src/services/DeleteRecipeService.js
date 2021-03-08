const { Recipes } = require('../database/index');
const AppError = require('../utils/AppError');

const { NOT_FOUND, UNAUTHORIZED } = require('../utils/errorStatus');

class DeleteRecipeService {
  async execute(recipeId, { userId, role }) {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipeFound = await recipesModel.findById(recipeId);

    if (!recipeFound) throw new AppError('recipe not found', NOT_FOUND);

    if (recipeFound.userId !== userId && role !== 'admin') {
      throw new AppError('unauthorized user, cannot update recipe', UNAUTHORIZED);
    }

    await recipesModel.delete(recipeId);
  }
}

module.exports = DeleteRecipeService;
