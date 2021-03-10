const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Desafio 3 - Cadastrar Recipe
const createRecipe = async (name, ingredients, preparation, userId) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  return { recipe: { _id: insertedId, name, ingredients, preparation, userId } };
};

  // Desafio 4 - Listar Receitas
const getAllRecipes = async () => {
  const recipes = await connection()
    .then((db) => db.collection('recipes').find().toArray());
  return recipes;
};

  // Desafio 5 - Pesquisar por receita pelo id
const findByIdRecipe = async (id) => {
  const recipe = await connection()
    .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return recipe;
};

  module.exports = {
    getAllRecipes,
    createRecipe,
    findByIdRecipe,
  };