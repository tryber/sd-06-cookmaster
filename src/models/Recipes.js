const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection().then((db) => db.collection('recipes')
    .insertOne({
      name,
    }));
      
  return {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };
};

module.exports = {
  create,
};
