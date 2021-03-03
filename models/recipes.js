const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const all = await connection('recipes').then((db) => db.find().toArray());

  return all;
};

const setRecipe = async (body, userId) => {
  const recipe = await connection('recipes').then((db) => db.insertOne({ ...body, userId }));

  return {
    recipe: {
      ...body,
      userId,
      _id: recipe.insertedId,
    },
  };
};

const findById = async (id) => {
  const recipe = await connection('recipes').then((db) => db.findOne({ _id: ObjectId(id) }));

  return recipe;
};

const editById = async (id, name, ingredients, preparation) => {
  const recipe = await connection('recipes').then((db) => db.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

  return recipe;
};

const deleteById = async (id) => {
  const recipe = await connection('recipes').then((db) => db.deleteOne({ _id: ObjectId(id) }));
  return recipe;
};

const uploadImage = async (id) => {
  const image = `localhost:3000/images/${id}.jpeg`;
  await connection('recipes').then((db) => db.updateOne(
    { _id: ObjectId(id) },
    { $set: { image } },
  ));
  const recipe = await findById(id);

  return { ...recipe, image };
};

module.exports = {
  getAll,
  setRecipe,
  findById,
  editById,
  deleteById,
  uploadImage,
};
