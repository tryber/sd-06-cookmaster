class ListAllService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute() {
    const recipes = await this.Recipe.listAll();
    return recipes;
  }
}

module.exports = ListAllService;
