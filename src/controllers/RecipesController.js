const CreateRecipeService = require('../services/CreateRecipeService');

// const OK = 200;
const CREATED = 201;

const createRecipe = async (req, res) => {
  const newRecipe = await CreateRecipeService(req.body, req.headers, res); 

  res.status(CREATED).json({
    recipe: newRecipe,
  });
}; 

module.exports = {
  createRecipe,
};
