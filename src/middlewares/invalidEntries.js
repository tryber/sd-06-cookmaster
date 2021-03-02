const invalidEntries = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const invalidEmailOrPassword = async (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  next();
};
module.exports = {
  invalidEntries,
  invalidEmailOrPassword,
};
