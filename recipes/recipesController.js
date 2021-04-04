const recipesService = require('./recipesService');

const createRecipe = async (req, res) => {
  console.log('RECIPES CONTROLLER');

  const { userId } = req;
  const { name, ingredients, preparation } = req.body;

  const newRecipe = {
    userId,
    name,
    ingredients,
    preparation,
  };

  const { createdRecipe, message } = await recipesService.createRecipe(newRecipe);
  if (message) return res.status(400).json({ message });

  res.status(201).json(createdRecipe);
};

module.exports = {
  createRecipe,
};
