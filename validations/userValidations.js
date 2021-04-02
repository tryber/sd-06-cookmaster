const validateUser = async (req, res, next) => {
  console.log('VALIDATE USER');
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const validateLogin = async (req, res, next) => {
  console.log('VALIDATE LOGIN');

  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  const regexEmail = /\S+@\S+\.\S+/;
  if (!regexEmail.test(email)) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  validateUser,
  validateLogin,
};
