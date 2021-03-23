const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createRecipes = async (recipe) => connection().then((db) => db.collection('recipe').insertOne(
    { recipe },
  ));

const findByrecipe = async (recipe) => connection().then((db) => db.collection('user').findOne(
  { 'user.recipe': { $exists: recipe } },
));

// db.user.find({ 'user.email': { $exists: 'fulano.silva@gmail.com'  } })

module.exports = {
  createRecipes,
  findByrecipe,
};
