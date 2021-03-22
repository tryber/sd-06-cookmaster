const { BAD_REQUEST } = require('../dictionary/StatusCode');
const { INVALID_ENTRIES } = require('../dictionary/ErrorMessage');

const name = (req, res, next) => {
  const { name: userName } = req.body;

  if (!userName) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  next();
};

const email = (req, res, next) => {
  const { email: userEmail } = req.body;
  const emailRegEx = /\S+@\S+\.\S+/;

  if (!userEmail || !emailRegEx.test(userEmail)) {
    return res.status(BAD_REQUEST).json(INVALID_ENTRIES);
  }

  next();
};

const password = (req, res, next) => {
  const { password: userPassword } = req.body;

  if (!userPassword) return res.status(BAD_REQUEST).json(INVALID_ENTRIES);

  next();
};

module.exports = {
  name,
  email,
  password,
};