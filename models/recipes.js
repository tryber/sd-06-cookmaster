const connection = require('./connection');

// falta url da imagem
const createRecipe = async (recipeInfo, userId) => {
  const { name, ingredients, preparation } = recipeInfo;
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  });
  return {
    recipe: { 
      name,
      ingredients,
      preparation,
      userId,
      _id: insertedId,
    },
  };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

module.exports = {
  createRecipe,
  getAll,
};