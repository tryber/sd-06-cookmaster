const existRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const NOT_FOUND = 404;
  
  if (!name || !ingredients || !preparation) {
   return res.status(NOT_FOUND).json({ message: 'recipe not found' });
  }
  next();
};

  module.exports = existRecipe;