class UpdateService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute({ name, ingredients, preparation, id }) {
    const recipe = await this.Recipe.update({ name, ingredients, preparation, id });
    return recipe;
  }
}

module.exports = UpdateService;