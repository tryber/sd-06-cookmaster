const BAD_REQUEST = 400;

function checkRecipeFields(request, response, next) {
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    next(
      {
        code: BAD_REQUEST,
        errorMessage: { message: 'Invalid entries. Try again.' },
      },
    );
  }
  next();
}

module.exports = checkRecipeFields;
