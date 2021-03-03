const { ObjectId } = require('mongodb');
const connection = require('./connection');
const Err = require('../errors/Err');

const collectionName = 'recipes';
const errorMessage = 'Something went wrong';
class Recipe {
  async create({ name, ingredients, preparation, userId }) {
    const db = connection();
    console.log(this);
    try {
      const { insertedId } = await db.collection(collectionName).insertOne({
        name, ingredients, preparation, userId,
      });
      return ({
        id: insertedId,
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
    const db = connection();
    console.log(this);
    try {
      const recipes = await db.collection(collectionName).find().toArray();
      return recipes;
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }

  async findById(id) {
    const db = connection();
    console.log(this);
    try {
      const recipe = await db.collection(collectionName).findOne(ObjectId(id));
      return recipe;
    } catch (err) {
      throw new Err({ message: errorMessage });
    }
  }
}

module.exports = Recipe;
