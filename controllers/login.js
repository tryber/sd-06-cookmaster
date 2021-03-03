const rescue = require('express-rescue');
const { loginService } = require('../services/loginService');

const variables = require('../utilities/variables');

const login = rescue(async (req, res, _next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const token = await loginService(email, password);
    if (token.code === 'unauthorized') {
      return res.status(variables.unauthorized).json({ message: token.message });
    }
    return res.status(variables.ok).json({ token });
  } catch (error) {
    console.log(error.message);
    return res.status(variables.internalError).json({ message: 'Erro interno', error });
  }
});

module.exports = { login };
