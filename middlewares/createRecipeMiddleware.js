const { addRecipe } = require('../models/recipesModel');

const errorMessage = {
  message: 'Invalid entries. Try again.',
};

async function respFormat(addedRecipes, id) {
  const formatedRecipeResponse = { 
    recipe: { 
      name: addedRecipes.recipe.name,
      ingredients: addedRecipes.recipe.ingredients,
      preparation: addedRecipes.recipe.preparation,
      userId: addedRecipes.recipe.userId,
      id,
    },
  };
  return formatedRecipeResponse;
}

async function recipeCreate(req, res, _next) {
  const {
    name,
    ingredients,
    preparation,
  } = req.body;
  
  if (Object.entries(req.body).length !== 3) {
    return res.status(400).json(errorMessage);
  }
  
  const [addedRecipes] = await 
    addRecipe(name, ingredients, preparation, res.locals.userId);
  const { _id: id } = addedRecipes;
  const response = await 
    respFormat(addedRecipes, id);
    res.status(201).json(response);
}

module.exports = recipeCreate;
