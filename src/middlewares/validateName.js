const UNPROCESS = 400;

const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(UNPROCESS).json({ message: 'Invalid entries. Try again.' });

  next();
};

module.exports = validateName;
