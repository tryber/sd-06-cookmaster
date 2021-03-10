const { ObjectID } = require('bson');
const connection = require('./connection');

const emailFind = async (email) => {
  const resp = await connection()
    .then((item) => item.collection('users').findOne({ email }))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
    return resp;
};

const userCreate = async (user) => {
  const { insertedId } = await connection()
    .then((item) => item.collection('users').insertOne(user))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

    return { user: { _id: insertedId, ...user } };
};

const recipeCreate = async (recipe) => {
  const { insertedId } = await connection()
    .then((item) => item.collection('recipes').insertOne(recipe))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

    return { recipe: { _id: insertedId, ...recipe } };
};

const getRecipes = async () => {
  const resp = await connection()
    .then((item) => item.collection('recipes').find().toArray())
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
  return resp;
};

const getRecipe = async (id) => {
  const valid = ObjectID.isValid(id);
  if (valid === false) return valid;
  const resp = await connection()
    .then((item) => item.collection('recipes').findOne(ObjectID(id)))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });
    return resp;
};

const recipeEdit = async (recipe) => {
  const { _id } = recipe;
  const valid = ObjectID.isValid(_id);
  if (valid === false) return valid;
  await connection()
    .then((item) => item.collection('recipes')
    .updateOne({ _id: ObjectID(_id) }, { $set: { ...recipe } }));

    return recipe;
};

const deleteRecipe = async (id) => {
  const rmv = await connection()
    .then((item) => item.collection('recipes').deleteOne({ _id: ObjectID(id) }))
    .catch((err) => {
      console.log(err);
      throw new Error(err);
    });

    return rmv;
};

module.exports = {
  emailFind,
  userCreate,
  recipeCreate,
  getRecipes,
  getRecipe,
  recipeEdit,
  deleteRecipe,
};
