const { ObjectId } = require('mongodb');
const connection = require('./connection');
const Err = require('../errors/Err');

const collectionName = 'recipes';
const errorMessage = 'Something went wrong';
class Recipe {
  async create({ name, ingredients, preparation, userId }) {
    const db = await connection();
    console.log(this);
    try {
      const { insertedId } = await db.collection(collectionName).insertOne({
        name, ingredients, preparation, userId,
      });
      return ({
        _id: insertedId,
        name,
        ingredients,
        preparation,
        userId,
      });
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async listAll() {
    const db = await connection();
    console.log(this);
    try {
      const recipes = await db.collection(collectionName).find().toArray();
      return recipes;
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async findById(id) {
    const db = await connection();
    console.log(this);
    try {
      const recipe = await db.collection(collectionName).findOne(ObjectId(id));
      return recipe;
    } catch (err) {
      throw new Err({ message: 'recipe not found' }, 404);
    }
  }

  async update({ name, ingredients, preparation, id }) {
    const db = await connection();
    console.log(this);
    try {
      const recipe = await db.collection(collectionName).updateOne(
        { _id: ObjectId(id) },
        { $set: { name, ingredients, preparation } },
      );
      return recipe;
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async updateImage(newRecipe) {
    const db = await connection();
    const { _id: id } = newRecipe;
    console.log(this);
    try {
      const recipe = await db.collection(collectionName).updateOne(
        { _id: ObjectId(id) },
        { $set: newRecipe },
      );
      return recipe;
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async delete(id) {
    const db = await connection();
    console.log(this);
    try {
      await db.collection(collectionName).deleteOne({ _id: ObjectId(id) });
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }
}

module.exports = Recipe;
