const checkEmail = (req, res, next) => {
  const { email, password } = req.body;
  const UNAUTHORIZED = 401;

  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  const verifyEmail = regexEmail.test(email);
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const verifyPassword = regexPassword.test(password);

 if (!verifyEmail || !password) {
  return res.status(UNAUTHORIZED).json({ message: 'All fields must be filled' });
}
if (!verifyPassword) {
  return res.status(UNAUTHORIZED).json({ message: 'Incorrect username or password' });
}
  next();
};

module.exports = checkEmail;
