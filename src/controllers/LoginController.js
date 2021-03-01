const LoginService = require('../service/LoginService');

const SUCCESS = 200;

const generateToken = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await LoginService.generateToken(email, password);
  
  if (result.payload) return next(result);
  return res.status(SUCCESS).json({ result });
};

module.exports = {
  generateToken,
};
