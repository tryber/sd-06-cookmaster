// const { ObjectId } = require('bson');

// const magicNumberzero = 0;
const status401 = 401;
const msgAllFields = 'All fields must be filled';
const msgIcorrect = 'Incorrect username or password';

// import querys
const {
  findByemail,
} = require('../models/queryLogin');
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
  const isEmailValid = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]+$/);
  if (!isEmailValid) {
    return res.status(status401).json({ message: msgIcorrect });
  }
  next();
};

const passwordExists = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(status401).json({ message: msgAllFields });
  }
  next();
};

const InvalidPassword = async (req, res, next) => {
  const { password, email } = req.body;
  const findUser = await findByemail(email);
  if (!findUser) {
    try {
      console.log('passou aqui', findUser.password);
      if (password !== findUser.password) {
        return res.status(status401).json({ message: msgIcorrect });
      }
    } catch (error) {
      console.log(error);
    }
  }
  next();
};

module.exports = {
  emailExists,
  emailValid,
  passwordExists,
  InvalidPassword,
};
