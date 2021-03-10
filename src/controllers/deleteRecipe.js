const Recipes = require('../service/recipes');

const SUCCESS = 204;

module.exports = async (req, res) => {
  const { id } = req.params;

  await Recipes.deleteRecipe(id)
    .then((data) => data)
    .catch((err) => err);

  return res.status(SUCCESS).send();
};