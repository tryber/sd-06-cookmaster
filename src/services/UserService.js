const UserModel = require('../models/UserModel');
const { throwThisError } = require('../utils/index');

const BAD_REQUEST = 400;
const CONFLICT = 409;

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
    return res.status(201).json({ user });
  } catch {
    throwThisError(500, 'Internal Error');
  }
};

const insertADM = async (req, res) => {
  const role = 'admin';

  try {
    const { name, email, password } = req.body;
    const message = 'Only admins can register new admins';
    if (req.userRole !== role) return res.status(403).json({ message });

    const insertedId = await UserModel.insertUser({ name, email, password, role });

    const user = { _id: insertedId, name, email, role };
    return res.status(201).json({ user });
  } catch {
    throwThisError(500, 'Internal Error');
  }
};

module.exports = {
  insertUser,
  validateRequestFields,
  insertADM,
};