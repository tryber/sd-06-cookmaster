const SUCCESS = 200;
const ERROR = 404;
const Recipes = require('../service/recipes');

module.exports = async (req, res) => {
  const { id } = req.params;

  const result = await Recipes.findById(id);

  if (!result) return res.status(ERROR).json({ message: 'recipe not found' });

  return res.status(SUCCESS).json(result);
};