const Err = require('../errors/Err');

class CreateRecipesService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute({ name, ingredients, preparation, userId }) {
    if (!name || !ingredients || !preparation) {
      const errorInfo = {
        message: 'Invalid entries. Try again.',
      };
      throw new Err(errorInfo, 400);
    }
    const newRecipe = await this.Recipe.create({ name, ingredients, preparation, userId });
    return newRecipe;
  }
}

module.exports = CreateRecipesService;