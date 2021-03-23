// const { ObjectId } = require('bson');

// const magicNumberzero = 0;
const status400 = 400;
const status409 = 409;
const msgTryAgain = 'Invalid entries. Try again.';

// import querys
const {
  findByemail,
  getUsers,
} = require('../models/queryUsers');
// -------------------------------------------

const nameExists = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 3) {
    return res.status(status400).json({ message: msgTryAgain });
  }
  next();
};

const emailExists = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(status400).json({ message: msgTryAgain });
  }
  next();
};

const emailValid = (req, res, next) => {
  const { email } = req.body;
  const isEmailValid = email.match(/\S+@\S+\.\S+/);
  if (!isEmailValid) {
    return res.status(status400).json({ message: msgTryAgain });
  }
  next();
};

const senhalExists = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(status400).json({ message: msgTryAgain });
  }
  next();
};

const emailAlreadyExists = async (req, res, next) => {
  const { email } = req.body;
  const findEmail = await findByemail(email);
  const users = await getUsers();
  console.log(users);
  if (findEmail) {
    return res.status(status409).json({ message: 'Email already registered' });
  }
  next();
};

// const emailAlreadyExists = async (req, res, next) => {
//   const { email } = req.body;
//   const findEmail = await findByemail(email);
//   console.log(email, findEmail.user.email, findEmail.user.email === email);
//   if (findEmail !== null && findEmail.user.email === email) {
//     return res.status(status409).json({ message: 'Email already registered' });
//   }
//   next();
// };

module.exports = {
  nameExists,
  emailExists,
  emailValid,
  senhalExists,
  emailAlreadyExists,
};
