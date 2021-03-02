const invalidEntries = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = {
  invalidEntries,
};
