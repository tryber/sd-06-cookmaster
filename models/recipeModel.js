const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAllRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const createRecipe = (data) => connection()
  .then((db) => db.collection('recipes').insertOne(data));

const findOneRecipe = async (id) => connection()
.then((db) => db.collection('recipes').findOne(ObjectId(id)));

const editRecipe = (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  ));

const deleteRecipe = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

const upload = async (id, recipe) => {
  const image = await connection().then((db) => db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: {
      image: `localhost:3000/images/${id}.jpeg`,
      } },
  ).then(() => ({ image: `localhost:3000/images/${id}.jpeg` })));
  return { ...recipe, ...image };
};

module.exports = { 
  createRecipe,
  findAllRecipes,
  findOneRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
