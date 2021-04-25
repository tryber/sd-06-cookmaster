const UNPROCESS = 400;

const validatePreparation = async (req, res, next) => {
  const { preparation } = req.body;

  if (!preparation) return res.status(UNPROCESS).json({ message: 'Invalid entries. Try again.' });

  next();
};

module.exports = validatePreparation;
