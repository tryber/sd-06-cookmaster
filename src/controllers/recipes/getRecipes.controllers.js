const { recipes } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await recipes.getRecipes(id);
    res.status(200).json(results);
  } catch (err) {
    return next(err);
  }
};
