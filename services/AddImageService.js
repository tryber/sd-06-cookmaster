class AddImageService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute(newRecipe) {
    await this.Recipe.updateImage(newRecipe);
  }
}

module.exports = AddImageService;