const { ObjectId } = require('mongodb');
const controllers = require('../Controllers/recipeControllers');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) return res.status(404).send({ message: 'recipe not found' });

  const recipe = await controllers.findById(id);

  if (!recipe) return res.status(404).send({ message: 'recipe not found' });

  next();
};
