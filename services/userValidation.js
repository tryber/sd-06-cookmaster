const connection = require('../connection/connection');

const BAD_REQUEST = 400;
const CONFLICT = 409;

const isBlank = (field) => !field || field === '';

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
  switch (true) {
    case (isBlank(name) || isBlank(email) || validateEmail(email) || isBlank(password)):
      return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
    case emailVerify:
      return res.status(CONFLICT).json({ message: 'Email already registered' });
    default: next();
  }
};

module.exports = validateUser;
