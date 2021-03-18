const { ObjectId } = require('mongodb');

const NOT_FOUND = 404;

function validateRecipe(req, res, next) {
  const { id } = req.params;
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

module.exports = validateRecipe;
