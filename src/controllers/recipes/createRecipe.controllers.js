const { recipes } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { body, user } = req;
    const recipe = await recipes.createRecipe(body, user);
    return res.status(201).json({ recipe });
  } catch (err) {
    return next(err);
  }
};
