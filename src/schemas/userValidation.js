const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;

const BAD_REQUEST_RESPONSE = { message: 'Invalid entries. Try again.' };

module.exports = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!name) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    if (!email) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    if (!regex.test(email)) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
    if (!password) return res.status(BAD_REQUEST).json(BAD_REQUEST_RESPONSE);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }

  next();
};
