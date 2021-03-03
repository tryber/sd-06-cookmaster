const connection = require('./connection');
const Err = require('../errors/Err');

const collectionName = 'recipes';

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
      throw new Err({ message: 'Something went wrong' });
    }
  }
}

module.exports = Recipe;