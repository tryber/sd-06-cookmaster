const { insertNewRecipe } = require('../models/recipesModel');

const CREATED = 201;
const BADREQUEST = 400;
const MinMaxLength = 3;
const errorObj = {
  message: 'Invalid entries. Try again.',
};

async function formateResponse(insertedRecipe, id) {
  const formatedRecipeResponse = {
    name: insertedRecipe.name,
    ingredients: insertedRecipe.ingredients,
    preparation: insertedRecipe.preparation,
    userId: insertedRecipe.userId,
    id,
  };
  return formatedRecipeResponse;
}

async function createRecipe(req, res, _next) {
  const {
    name,
    ingredients,
    preparation,
  } = req.body;
  if (Object.entries(req.body).length !== MinMaxLength) {
    return res.status(BADREQUEST).json(errorObj);
  }
  const [insertedRecipe] = await insertNewRecipe(name, ingredients, preparation, res.locals.userId);
  const { _id: id } = insertedRecipe;
  const response = await formateResponse(insertedRecipe, id);
  return res.status(CREATED).json({ recipe: response });
}

module.exports = createRecipe;