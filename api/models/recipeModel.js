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

module.exports = {
  createRecipe,
  getAllRecipes,
};
