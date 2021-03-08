const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (name, ingredients, preparation, userId) => {
    const { insertedId } = await connection()
        .then((mongoDB) => mongoDB
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId }));

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

const getRecipesInServer = async () => {
    const AllRecipes = await connection()
          .then((mongodb) => mongodb.collection('recipes').find().toArray());

          return AllRecipes;
};

const getUnitRecipeInServer = async (id) => {
    const UnitRecipe = await connection()
    .then((mongoDB) => mongoDB.collection('recipes').findOne(ObjectId(id)));
    return UnitRecipe;
};

const editRecipesInServer = async (id, name, ingredients, preparation) => connection()
    .then((mongoDB) => mongoDB.collection('recipes').updateOne(
        { _id: ObjectId(id) },
        { $set: {
            name, ingredients, preparation,
        } },
    ));

const deletRecipeInServer = async (id) => {
    await connection()
    .then((mongoDB) => mongoDB.collection('recipes').findOneAndDelete(
        { _id: ObjectId(id) },
        { returnOriginal: false },
      ));
};

module.exports = {
    editRecipesInServer,
    createRecipes,
    getRecipesInServer,
    getUnitRecipeInServer,
    deletRecipeInServer,
    
  };