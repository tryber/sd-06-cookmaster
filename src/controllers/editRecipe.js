const Recipes = require('../service/recipes');

const SUCCESS = 200;

module.exports = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { userId } = await Recipes.findById(id);

  await Recipes.update(id, data, userId)
    .then((response) => response)
    .catch((err) => err);

  const { name, ingredients, preparation } = data;
  return res.status(SUCCESS).json({ id, name, ingredients, preparation, userId });
};