const BAD_REQUEST = 400;

module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};
