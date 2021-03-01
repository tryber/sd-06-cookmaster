// const { ObjectId } = require('mongodb');
const usersModel = require('../models/usersModel');
const { invalidData, UNIQUE } = require('../variables');

const getUsers = async () => usersModel.getAllUsers();
const userCreate = async (data) => usersModel.createUser(data);

const validateUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(invalidData).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const pattern = /\S+@\S+.\S+/;  
  const allUsers = await usersModel.getAllUsers();
  const exists = await allUsers.find((user) => user.email === email);

  if (!pattern.test(email)) {
    return res.status(invalidData).json({
      message: 'Invalid entries. Try again.',
    });
  }

  if (exists) return res.status(UNIQUE).json({ message: 'Email already registered' });

  next();
};

module.exports = {
  getUsers,
  userCreate,
  validateUser,
  checkEmail,
};
