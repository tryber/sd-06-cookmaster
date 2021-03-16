const AppError = require('../errors/AppError');

const errorMsg = 'Invalid entries. Try again.';

function validateRecipeData(request, _response, next) {
  const { name, preparation, ingredients } = request.body;

  if (!name || !preparation || !ingredients) throw new AppError(errorMsg);

  next();
}

module.exports = validateRecipeData;
