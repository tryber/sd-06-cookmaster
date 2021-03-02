const { ObjectId } = require('mongodb');
const connection = require('./Connection');

exports.create = async (name, ingredients, preparation, userId) => {
  const result = await connection().then(
    (db) => db.collection('recipes').insertOne({
      name,
      ingredients,
      preparation,
      userId: ObjectId(userId),
    }),
  );

  return result.ops[0];
};