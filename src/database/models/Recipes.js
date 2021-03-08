const Crud = require('./Crud');

const AppError = require('../../utils/AppError');
const { NOT_FOUND } = require('../../utils/errorStatus');

class Recipes extends Crud {
  constructor() {
    super('recipes');
  }

  async findById(queryParams) {
    try {
      const recipe = await super.findById(queryParams);
      return recipe;
    } catch (error) {
      throw new AppError('recipe not found', NOT_FOUND);
    }
  }

  async update(recipeId, { name, ingredients, preparation }) {
    const updateFields = {
      $set: {
        name,
        ingredients,
        preparation,
      },
    };

    const updatedProduct = await super.update(recipeId, updateFields);

    return updatedProduct;
  }
}

module.exports = Recipes;
