const { Recipes } = require('../database/index');
const AppError = require('../utils/AppError');

const { NOT_FOUND } = require('../utils/errorStatus');

class GetRecipeByIdService {
  async execute(userId) {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipeFound = await recipesModel.findById(userId);

    if (!recipeFound) throw new AppError('recipe not found', NOT_FOUND);

    return recipeFound;
  }
}

module.exports = GetRecipeByIdService;
