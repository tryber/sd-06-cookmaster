module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const BAD_REQUEST = 400;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).send({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};
