const ERRO = 400;
module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(ERRO).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};