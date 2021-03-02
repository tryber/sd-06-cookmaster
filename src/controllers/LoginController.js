const LoginService = require('../service/LoginService');

const SUCCESS = 200;

const generateToken = async (req, res, next) => {
  const { email, password } = req.body;
  const token = await LoginService.generateToken(email, password);
  
  if (token.payload) return next(token);
  return res.status(SUCCESS).json({ token });
};

module.exports = {
  generateToken,
};
