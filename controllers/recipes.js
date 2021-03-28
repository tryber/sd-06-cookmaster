const services = require('../services/recipes');
const { CREATED } = require('../dictionary/StatusCode');

const createNewRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { name: recipeName, ingredients, preparation } = req.body;

  const recipe = await services.createNewRecipe(recipeName, ingredients, preparation, userId);

  return res.status(CREATED).json({ recipe });
};

module.exports = {
  createNewRecipe,
};