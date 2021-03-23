// const { ObjectId } = require('bson');

// const magicNumberzero = 0;
const status401 = 401;
const msgAllFields = 'All fields must be filled';

// import querys
// const {
//   findByemail,
// } = require('../models/queryLogin');
// -------------------------------------------

const emailExists = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(status401).json({ message: msgAllFields });
  }
  next();
};

const emailValid = (req, res, next) => {
  const { email } = req.body;
  const isEmailValid = email.match(/\S+@\S+\.\S+/);
  if (!isEmailValid) {
    return res.status(status401).json({ message: msgAllFields });
  }
  next();
};

const senhalExists = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(status401).json({ message: msgAllFields });
  }
  next();
};

module.exports = {
  emailExists,
  emailValid,
  senhalExists,
};
