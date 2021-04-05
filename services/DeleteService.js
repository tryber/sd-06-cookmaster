class DeleteService {
  constructor(Recipe) {
    this.Recipe = Recipe;
  }

  async execute(id) {
    await this.Recipe.delete(id);
  }
}

module.exports = DeleteService;