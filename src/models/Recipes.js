const { ObjectId } = require('mongodb');
const connection = require('./Connection');

exports.getAll = async () => (
  connection().then((db) => db.collection('recipes').find().toArray())
);

exports.findById = async (id) => (
  connection().then((db) => db.collection('recipes').findOne(ObjectId(id)))
);

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

exports.update = async (id, name, ingredients, preparation) => (
  connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ))
);
