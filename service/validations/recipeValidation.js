const messageError400 = 'Invalid entries. Try again.';

const createError = (message, status) => ({ message, status });

const recipeValidation = async (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return next(createError(messageError400, 400));
  }
    next();
};

module.exports = {
  recipeValidation,
};