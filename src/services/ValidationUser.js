// const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const findByEmail = async (email) => {
  const emailExists = await connection().then((db) => 
    db.collection('users').findOne({ email }));
  if (emailExists !== null) {
    return true;
  }
};

const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailVerify = await findByEmail(email);
  const emailIsValid = validateEmail(email);
  console.log(emailVerify);
  if (!name || name === '' || !email || email === '' || !password || password === ''
        || !emailIsValid) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  if (!emailVerify) {
    return res.status(CONFLICT).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = validateUser;
