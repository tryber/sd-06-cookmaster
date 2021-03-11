const { loginUserDb } = require('../models/UserModel');

const { USER_UNAUTHORIZED, INCORRECT_USERNAME } = require('../errors/messagesErrors');

const UNAUTHORIZED = 401;

const regexValiditEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const validateLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    return res.status(UNAUTHORIZED).json({ message: USER_UNAUTHORIZED });
  }
  const user = await loginUserDb(email);
  
  if (user === null || !email || !regexValiditEmail.test(email) || user.email !== email) {
    return res.status(UNAUTHORIZED).json({ message: INCORRECT_USERNAME });
  }
  if (user.password !== password) {
    return res.status(UNAUTHORIZED).json({ message: INCORRECT_USERNAME });
  }

  next();
};

module.exports = validateLoginUser;