const UNPROCESS = 400;

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(UNPROCESS).json({ message: 'Invalid entries. Try again.' });

  next();
};

module.exports = validatePassword;