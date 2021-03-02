const { ObjectId } = require('mongodb');

const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const RecipesValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  try {
    if (!name || !ingredients || !preparation) {
      return res.status(STATUS_BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    }
  } catch (err) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ err: 'Server Internal Error' });
  }
  next();
};

const RecipeIdValidation = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      return res.status(STATUS_NOT_FOUND).json({ message: 'recipe not found' });
    }
  } catch (error) {
    return res.status(STATUS_INTERNAL_SERVER_ERROR).json({ err: 'Server Internal Error' });
  }
  next();
};

module.exports = {
  RecipesValidation,
  RecipeIdValidation,
};
