const { INVALID_ENTRIES } = require('../errors/messagesErrors');

const BAD_REQUEST = 400;

const validateCreateRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (name === undefined || ingredients === undefined || preparation === undefined) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }

  next();
};

module.exports = validateCreateRecipe;
