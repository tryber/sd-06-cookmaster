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

// Desafio 7- Atualizar pelo id
const updateIdRecipe = async (recipe, name, ingredients, preparation) => {
  const { id, userId } = recipe;
  await connection()
    .then((db) => db.collection('recipes').updateOne(
      { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
      ));
  return { _id: id, name, ingredients, preparation, userId };
};

// Desafio 8 - Remover receita pelo id
const removeIdRecipe = async (id) => {
  await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }))
    .catch((err) => console.error(err));
  return true;
};

  module.exports = {
    getAllRecipes,
    createRecipe,
    findByIdRecipe,
    updateIdRecipe,
    removeIdRecipe,
  };