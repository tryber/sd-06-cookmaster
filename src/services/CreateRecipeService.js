const { Recipes } = require('../database/index');
// const AppError = require('../utils/AppError');

// const { CONFLICT } = require('../utils/errorStatus');

class CreateRecipeService {
  async execute({ name, ingredients, preparation, userId }) {
    this.count += 1;
    const recipesModel = new Recipes();

    const recipeCreated = await recipesModel.create({ name, 
      ingredients,
      preparation,
      userId,
    });

    return recipeCreated;
  }
}

module.exports = CreateRecipeService;
