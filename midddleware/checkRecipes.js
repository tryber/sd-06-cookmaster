const checkRecipes = (req, res, next) => {
  const badRequest = 400;
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res
      .status(badRequest).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};
module.exports = checkRecipes;