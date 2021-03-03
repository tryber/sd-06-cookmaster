const UserModel = require('../models/UserModel');
const { throwThisError } = require('../utils/index');

const BAD_REQUEST = 400;
const CONFLICT = 409;

// const thisEmailExists = async (req, res, next) => {
//   const { email } = req.body;
//   const exists = await UserModel.findByEmail(email);
//   console.log(email + exists.email);
//   if (exists.email === email) throwThisError(CONFLICT, 'Email already exists');
//   next();
// };

const validateRequestFields = async (req, res, next) => {
    const { name, email, password } = req.body;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const throwErr = () => throwThisError(BAD_REQUEST, 'Invalid entries. Try again.');
    const exists = await UserModel.findByEmail(email);
    
    switch (true) {
      case (!name || !email || !password): throwErr();
        break;
      case (!isEmailValid): throwErr();
        break;
      default:
        break;
      }
      
    if (exists) throwThisError(CONFLICT, 'Email already registered');
    next();
};

const insertUser = async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    const insertedId = await UserModel.insertUser({ name, email, password, role });

    const user = { _id: insertedId, name, email, role };
    res.status(201).json({ user });
  } catch {
    throwThisError(500, 'Internal Error');
  }
};

module.exports = {
  insertUser,
  validateRequestFields,
  // thisEmailExists,
};