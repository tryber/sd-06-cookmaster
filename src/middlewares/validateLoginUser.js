const { loginUserDb } = require('../models/UserModel');

const { USER_UNAUTHORIZED, INCORRECT_USERNAME } = require('../errors/messagesErrors');

const UNAUTHORIZED = 401;

const regexValiditEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const checkEmail = (email, res, user) => {
  if (email && !regexValiditEmail.test(email)) {
    return res.status(UNAUTHORIZED).send({ message: INCORRECT_USERNAME });
  }

  if (user.email !== email) {
    return res.status(UNAUTHORIZED).send({ message: INCORRECT_USERNAME });
  }
};

const checkPassword = (password, res, user) => {
  if (user.password !== password) {
    return res.status(UNAUTHORIZED).send({ message: INCORRECT_USERNAME });
  }
};

const checkResponse = (email, password, res) => {
  if (email === undefined) {
    return res.status(UNAUTHORIZED).json({ message: USER_UNAUTHORIZED });
  }
  if (password === undefined) {
    return res.status(UNAUTHORIZED).json({ message: USER_UNAUTHORIZED });
  }
};

const validateLoginUser = async (req, res, next) => {
  const { email, password } = req.body;

  checkResponse(email, password, res);

  const user = await loginUserDb(email);

  console.log(user);

  if (user === null) {
    return res.status(UNAUTHORIZED).send({ message: INCORRECT_USERNAME });
  }

  checkEmail(email, res, user);

  checkPassword(password, res, user);

  next();
};

module.exports = validateLoginUser;