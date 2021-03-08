const User = require('../services/User');
const createToken = require('../auth/createToken');

const statusSuccess = 200;
const statusUnauthorized = 401;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(statusUnauthorized).json({ message: 'All fields must be filled' });
  }

  const user = await User.findAll()
    .then((users) => users.find((u) => u.email === email && u.password === password));
  if (!user) {
    return res.status(statusUnauthorized).json({ message: 'Incorrect username or password' });
  }

  const payload = { _id: user._id, email: user.email, role: user.role };
  const token = createToken(payload);

  return res.status(statusSuccess).json({ token });
};

module.exports = login;
