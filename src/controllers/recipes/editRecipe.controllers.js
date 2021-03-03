const { recipes } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body, user, params: { id } } = req;
    const recipe = await recipes.editRecipe(id, user, body);
    return res.status(200).json(recipe);
  } catch (err) {
    next(err);
  }
};
