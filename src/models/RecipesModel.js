const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertId } = await connection()
    .then((db) => db.collection('users').insertOne({ name, ingredients, preparation, userId }));
    return {
      recipe: {
        name,
        ingredients,
        userId,
        _id: ObjectId(insertId),
      },
    };
  };

  module.exports = {
    getAllRecipes,
    createRecipe,
  };