const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const BAD_REQUEST_RESPONSE = { message: 'Invalid entries. Try again.' };

module.exports = (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;

    if (!name) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    if (!ingredients) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    if (!preparation) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  next();
};
