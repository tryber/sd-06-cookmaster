const jwt = require('jsonwebtoken');
const user = require('../../models/user');

const secret = 'segredo';
const messageError401 = 'Incorrect username or password';
const messageError401MissingField = 'All fields must be filled';
const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createError = (message, status) => ({ message, status });

const loginVerification = async (req, res, next) => {
  try {
    const { email: emailLogin, password: passwordLogin } = req.body;
    if (!emailLogin || !passwordLogin) return next(createError(messageError401MissingField, 401));
    
    const userInfo = await user.findByEmail(emailLogin);
   if (!userInfo) return next(createError(messageError401, 401));
    const { _id, email, password, role } = userInfo;
    if (passwordLogin !== password) {
        return next(createError(messageError401, 401));
      }; 

    const token = jwt.sign({ payload: { _id, email, role } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch {
    return res.status(500).json({ message: 'Internal error' });
  }
};

module.exports = {
  loginVerification,
};
