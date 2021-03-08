const { ObjectId } = require('mongodb');
const getConnection = require('./connection');
// const validateToken = require('../services/auth/validateToken');

const getAll = async () => {
  const listRecipes = await getConnection('recipes').then((db) => db.find().toArray());
  return (listRecipes);
};

const getId = async (id) => {
  const recipesId = await getConnection('recipes').then((db) => db.findOne({ _id: ObjectId(id) }));
  return (recipesId);
};

const createRecipes = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await getConnection('recipes').then((db) =>
    db.insertOne({
      name,
      ingredients,
      preparation,
      userId,
    }));
  // const payload = await validateToken(authorization);
  const usersRegister = {
    name,
    ingredients,
    preparation,
    userId,
    _id: insertedId,
  };

  return { recipe: usersRegister };
};

const putId = async (id, name, ingredients, preparation) => {
  const recipeEdit = await getConnection('recipes').then((db) =>
    db.updateOne(
      {
        _id: ObjectId(id),
      },
      { $set: { name, ingredients, preparation } },
    ));
    return { recipeEdit };
  };
  
const deleteRecipes = async (id) => {
  await getConnection('recipes').then((db) => db.deleteOne({ _id: ObjectId(id) }));
};
module.exports = {
  createRecipes,
  getAll,
  getId,
  putId,
  deleteRecipes,
};
