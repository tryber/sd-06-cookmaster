const { insertNewRecipe } = require('../models/recipesModel');

const CREATED = 201;
const BADREQUEST = 400;
const MinMaxLength = 3;
const errorObj = {
  message: 'Invalid entries. Try again.',
};

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
  const formatedRecipeResponse = { recipe: { name: insertedRecipe.recipe.name,
    ingredients: insertedRecipe.recipe.ingredients,
    preparation: insertedRecipe.recipe.preparation,
    userId: insertedRecipe.recipe.userId,
    // eslint-disable-next-line no-underscore-dangle
    id: insertedRecipe._id,
    },
  };
  res.status(CREATED).json(formatedRecipeResponse);
}

// console.log(res.locals.userId);
module.exports = createRecipe;