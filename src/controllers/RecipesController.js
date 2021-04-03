const recipesService = require('../services/CreateRecipeService');

const status201 = 201;

const createRecipeControler = async (req, res) => {
  const newRecipe = await recipesService.createRecipeService(req.body);

  if (newRecipe.err) { 
    return res.status(newRecipe.err.status).json({ message: newRecipe.err.message });
  }

  return res.status(status201).json(newRecipe);
};

module.exports = {
  createRecipeControler,
};