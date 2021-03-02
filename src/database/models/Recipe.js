const mongodb = require('mongodb');
const AppError = require('../../errors/AppError.js');

const connection = require('../index.js');

const errorMsg = 'Invalid entries. Try again.';

const collectionName = 'recipes';

class Recipe {
  constructor() {
    this.connection = connection;
  }

  async create(recipeInfo) {
    const { name, preparation, ingredients, userId } = recipeInfo;

    const db = await this.connection();

    const queryInfo = await db.collection(collectionName).insertOne({
      name,
      preparation,
      ingredients,
      userId,
    });

    const [newRecipe] = queryInfo.ops;

    return newRecipe;
  }

  async listAll() {
    const db = await this.connection();

    const recipes = await db.collection(collectionName).find().toArray();

    return recipes;
  }

  async findByID(id) {
    const db = await this.connection();

    const idIsValid = mongodb.ObjectId.isValid(id);

    if (!idIsValid) throw new AppError(errorMsg);

    const recipe = await db.collection(collectionName).findOne(mongodb.ObjectId(id));

    return recipe;
  }

  async update({ name, ingredients, preparation, _id }) {
    const db = await this.connection();

    const updatedFields = { name, ingredients, preparation };

    await db.collection(collectionName).updateOne(
      { _id: mongodb.ObjectId(_id) },
      { $set: updatedFields },
    );

    const updatedInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(_id));

    return updatedInfo;
  }

  async updateImage({ recipeId, image }) {
    const db = await this.connection();

    const updatedFields = { image };

    await db.collection(collectionName).updateOne(
      { _id: mongodb.ObjectId(recipeId) },
      { $set: updatedFields },
    );

    const updatedInfo = await db.collection(collectionName).findOne(mongodb.ObjectId(recipeId));

    return updatedInfo;
  }

  async deleteByID(recipeId) {
    const db = await this.connection();

    const idIsValid = mongodb.ObjectId.isValid(recipeId);

    if (!idIsValid) throw new AppError(errorMsg);

    await db.collection(collectionName).deleteOne(
      { _id: mongodb.ObjectId(recipeId) },
    );
  }
}

module.exports = Recipe;
