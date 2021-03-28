const services = require('../services/login');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const result = await services.loginUser(email, password);

  return res.status(result.status).json({ message: result.message });
};

module.exports = { loginUser };