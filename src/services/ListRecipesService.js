class ListRecipesService {
  constructor(RecipesModel) {
    this.RecipesModel = RecipesModel;
  }

  async execute() {
    const recipes = await this.RecipesModel.listAll();

    return recipes;
  }
}

module.exports = ListRecipesService;
