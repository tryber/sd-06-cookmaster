const { findRecipe } = require('../assets');

const ID_LENGTH = 24;
const STATUS_404 = 404;
const ERR_MESSAGE = { message: 'recipe not found' };

const middleFindRecipe = async (request, response, next) => {
  const { id } = request.params;
  if (id.length !== ID_LENGTH) return response.status(STATUS_404).json(ERR_MESSAGE);
  const searchRecipe = await findRecipe(id);
  if (!searchRecipe) return response.status(STATUS_404).json(ERR_MESSAGE);
  next();
};

module.exports = middleFindRecipe;
