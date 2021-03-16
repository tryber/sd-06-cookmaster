class CreateUserService {
  constructor(RecipeModel, HashProvider) {
    this.RecipeModel = RecipeModel;
    this.HashProvider = HashProvider;
  }

  async execute({ name, preparation, ingredients, userId }) {
    this.count += 1;
    const recipeToCreate = {
      name,
      preparation,
      ingredients,
      userId,
    };

    const newRecipe = await this.RecipeModel.create(recipeToCreate);

    return newRecipe;
  }
}

module.exports = CreateUserService;
