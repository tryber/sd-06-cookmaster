const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const createRecipe = async (name, ingredients, preparation) => {
  try {
    const db = await connection();
    const res = await db.collection('recipes').insertOne(
      { name, ingredients, preparation },
    );
    return res.ops[0];
  } catch (err) {
    console.log(err);
  }
};

const getAllRecipes = async () => {
  try {
    const db = await connection();
    const res = await db.collection('recipes').find().toArray();
    return res;
  } catch (err) {
    console.error(err);
  }
};

const findById = async (id) => {
  try {
    const db = await connection();
    const res = await db.collection('recipes').findOne(ObjectId(id));
    return res;
  } catch (err) {
    console.error(err);
  }
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  try {
    const db = await connection();
    await db.collection('recipes').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, ingredients, preparation } },
    );
    return { id, name, ingredients, preparation };
  } catch (err) {
    console.error(err);
  }
};

const deleteRecipe = async (id) => {
  try {
    const db = await connection();
    await db.collection('recipes').deleteOne(
      { _id: ObjectId(id) },
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  findById,
  updateRecipe,
  deleteRecipe,
};
