const { recipes } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { user, params: { id } } = req;
    await recipes.deleteRecipe(id, user);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};
