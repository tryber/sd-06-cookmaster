const { findById } = require('../service/recipeService');

const checkId = async (req, res, next) => {
  const { id } = req.params;
  const notFound = 404;
  const find = await findById(id);
  if (find === null) return res.status(notFound).json({ message: 'recipe not found' });
  next();
};

module.exports = checkId;