const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  await connection().then((db) => db.collection('recipes').insertOne(recipe));
  return recipe;
};

const selectAll = async () => connection().then((db) => db.collection('recipes').find().toArray());

const selectById = async (id) => connection().then((db) => db.collection('recipes')
  .findOne(ObjectId(id)));

const update = async (id, dataBody) => {
  const updateProduct = await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { ...dataBody } },
  ));
  if (updateProduct) return { _id: id, dataBody };
  return { message: 'nada feito' };
};

module.exports = {
  createRecipe,
  selectAll,
  selectById,
  update,
};
