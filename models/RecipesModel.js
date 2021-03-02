const connection = require('./connection');

const getAllRecipes = async () => connection()
    .then((database) => database.collection('recipes').find().toArray());

const createRecipe = async (id, name, ingredients, preparation) => {
  const { insertedId } = await connection()
    .then((db) => db.collection('recipes').insertOne({ id, name, ingredients, preparation }));
  // console.log('insertedid', insertedId);
    return {
    recipeId: insertedId,
  };
};

const getRecipe = async (something) => {
 const user = await connection()
    .then((db) => db.collection('recipes').findOne({ something }));
 return user;
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
};
