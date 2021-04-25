const UNPROCESS = 400;

const validateIngredients = async (req, res, next) => {
  const { ingredients } = req.body;

  if (!ingredients) return res.status(UNPROCESS).json({ message: 'Invalid entries. Try again.' });

  next();
};

module.exports = validateIngredients;
