const connection = require('./connection');

const addRecipe = async (name, ingredients, preparation, userId) => {
  const newRecipe = await 
    connection('recipes').then((db) => db.insertOne(
    { recipe: { 
      name, 
      ingredients, 
      preparation, 
      userId } },

    { name: 1, 
      ingredients: 1, 
      preparation: 1, 
      userId: 1, 
      _id: 1 },
  ));

  return newRecipe.ops;
};

module.exports = {
  addRecipe,
};