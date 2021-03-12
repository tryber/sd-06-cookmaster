const verifyUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const BAD_REQUEST = 400;
  // const CONFLICT = 409;

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  const verifyEmail = regexEmail.test(email);

  if (!name || !email || !password || !verifyEmail) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = verifyUser;