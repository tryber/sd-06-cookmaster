const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (id, name, ingredients, preparation) => {
  const recipe = {
    name,
    ingredients,
    preparation,
    userId: id,
  };
  const { insertedId } = await connection().then((db) => db.collection('recipes')
    .insertOne({ recipe }));

  return {
    recipe: {
      name,
      ingredients,
      preparation,
      userId: id,
      _id: ObjectId(insertedId),
    },
  };
};

module.exports = {
  create,
};
