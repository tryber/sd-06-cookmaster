const { ObjectId } = require('mongodb');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const BAD_REQUEST_RESPONSE = { message: 'Invalid entries. Try again.' };

module.exports = {
  createValidation: (req, res, next) => {
    try {
      const { name, ingredients, preparation } = req.body;

      if (!name) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
      if (!ingredients) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
      if (!preparation) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
    }

    next();
  },
  findByIdValidation: (req, res, next) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) return res.status(NOT_FOUND).json({ message: 'recipe not found' });

    next();
  },
};
