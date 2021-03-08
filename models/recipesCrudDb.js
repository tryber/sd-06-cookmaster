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
  const updateProduct = await connection().then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) }, { $set: { ...dataBody } }, { returnOriginal: false },
  ));
  if (updateProduct) return updateProduct.value;
  return false;
};

const deleteRecipe = async (id) => connection().then((db) => db.collection('products')
  .deleteOne({ _id: ObjectId(id) }));

const updateImage = async (id, image) => {
  const updateProduct = await connection().then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) }, { $set: { image } }, { returnOriginal: false },
  ));
  if (updateProduct) return updateProduct.value;
  return false;
};

module.exports = {
  createRecipe,
  selectAll,
  selectById,
  update,
  deleteRecipe,
  updateImage,
};
