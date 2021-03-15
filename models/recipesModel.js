const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (recipe) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne(recipe))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

  return { recipe: { _id: insertedId, ...recipe } };
};

const getAll = async () => {
  try {
    const result = await connection()
      .then((db) => db.collection('recipes').find().toArray());

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const findId = async (id) => {
  try {
    const validId = ObjectID.isValid(id);
    if (validId === false) return validId;
    const result = await connection()
      .then((db) => db.collection('recipes').findOne(ObjectID(id)));

    return result;
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (recipe) => {
  try {
    const { _id, name, ingredients, preparation, image } = recipe;
    const updateRecipe = (!image)
      ? { name, ingredients, preparation }
      : { image };
    const validId = ObjectID.isValid(_id);
    if (validId === false) return validId;

    await connection()
    .then((db) => db.collection('recipes')
      .updateOne({ _id: ObjectID(_id) }, { $set: { ...updateRecipe } }));

    return recipe;
  } catch (e) {
    throw new Error(e);
  }
};

const remove = async (id) => {
  try {
    return await connection()
      .then((db) => db.collection('recipes').deleteOne({ _id: ObjectID(id) }));
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  create,
  findId,
  getAll,
  update,
  remove,
};
