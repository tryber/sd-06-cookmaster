const error = 400;

function checkRecipeField(req, res, next) {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    next(
      {
        code: error,
        errorMessage: { message: 'Invalid entries. Try again.' },
      },
    );
  }
  next();
}

module.exports = checkRecipeField;
