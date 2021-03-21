const SUCCESS = 200;
const Recipes = require('../service/recipes');

module.exports = async (req, res) => {
  const result = await Recipes.getAll();

  return res.status(SUCCESS).json(result);
};