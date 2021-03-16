const AppError = require('../errors/AppError');
const { NOT_FOUND, UNAUTHORIZED } = require('../errors/status');

const notFoundError = 'recipe not found';
const unError = 'user unauthorized to update this recipe';

class DeleteRecipeByIDService {
  constructor(RecipeModel) {
    this.RecipeModel = RecipeModel;
  }

  async execute({ recipeId, role, userId }) {
    this.count += 1;

    const recipe = await this.RecipeModel.findByID(recipeId);

    if (!recipe) throw new AppError(notFoundError, NOT_FOUND);

    if (recipe.userId !== userId && role !== 'admin') throw new AppError(unError, UNAUTHORIZED);

    const updatedRecipe = await this.RecipeModel.deleteByID(recipeId);

    return updatedRecipe;
  }
}

module.exports = DeleteRecipeByIDService;
