const { Recipes } = require('../database/index');
// const AppError = require('../utils/AppError');

// const { CONFLICT } = require('../utils/errorStatus');

class ListRecipesService {
  async execute() {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipeCreated = await recipesModel.findAll();

    return recipeCreated;
  }
}

module.exports = ListRecipesService;
