const AppError = require('../errors/AppError');
const { NOT_FOUND, UNAUTHORIZED } = require('../errors/status');

const notFoundError = 'recipe not found';
const unError = 'user unauthorized to update this recipe';

class UpdateRecipeService {
  constructor(RecipeModel) {
    this.RecipeModel = RecipeModel;
  }

  async execute({ recipeId, name, preparation, ingredients, role, userId }) {
    this.count += 1;

    const recipe = await this.RecipeModel.findByID(recipeId);

    if (!recipe) throw new AppError(notFoundError, NOT_FOUND);

    if (recipe.userId !== userId && role !== 'admin') throw new AppError(unError, UNAUTHORIZED);

    const recipeToUpdate = { ...recipe, ingredients, name, preparation };

    const updatedRecipe = await this.RecipeModel.update(recipeToUpdate);

    return updatedRecipe;
  }
}

module.exports = UpdateRecipeService;
