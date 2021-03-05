const { ObjectId } = require('mongodb');

const NOT_FOUND = 404;

function validateRecipeId(request, response, next) {
  const { id } = request.params;
  if (!ObjectId.isValid(id)) {
    next(
      {
        code: NOT_FOUND,
        errorMessage: { message: 'recipe not found' },
      },
    );
  }
  next();
}

module.exports = validateRecipeId;
