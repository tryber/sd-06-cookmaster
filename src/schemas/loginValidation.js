const UNAUTHORIZED = 401;
const INTERNAL_SERVER_ERROR = 500;

const BAD_REQUEST_RESPONSE = { message: 'All fields must be filled' };

module.exports = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(UNAUTHORIZED).json(BAD_REQUEST_RESPONSE);
    if (!password) return res.status(UNAUTHORIZED).json(BAD_REQUEST_RESPONSE);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  next();
};
