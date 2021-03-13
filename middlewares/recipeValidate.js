module.exports = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const badRequest = 400;

  if (!name || !ingredients || !preparation) {
    return res.status(badRequest).send({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};