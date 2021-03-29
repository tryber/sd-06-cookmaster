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
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(status401).json({ message: msgAllFields });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const emailValid = (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailValid = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z.]+$/);
    if (!isEmailValid) {
      return res.status(status401).json({ message: msgIcorrect });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const passwordExists = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(status401).json({ message: msgAllFields });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const InvalidPassword = async (req, res, next) => {
  const { password, email } = req.body;
  try {
    const findUser = await findByemail(email);
    const dbpassword = findUser.map((obj) => obj.password);
    if (password !== dbpassword[0]) {
      return res.status(status401).json({ message: msgIcorrect });
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  emailExists,
  emailValid,
  passwordExists,
  InvalidPassword,
};
