const Err = require('../errors/Err');

class FindByIdService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute(id) {
    const recipe = await this.Recipe.findById(id);
    console.log(recipe)
    if (!recipe) {
      const errorInfo = {
        message: 'recipe not found',
      };
      throw new Err(errorInfo, 404);
    }
  }
}

module.exports = FindByIdService;
