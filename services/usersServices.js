const jwt = require('jsonwebtoken');
const { SECRET } = require('../controllers/loginController');
const usersModel = require('../models/usersModel');
const { invalidData, UNIQUE, NOTADMIN } = require('../variables');

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

const message = 'Only admins can register new admins';

const checkAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(NOTADMIN).json({ message });
  }

  try {
    const decoded = jwt.verify(req.headers.authorization, SECRET);
    const user = await usersModel.findOneUser(decoded.data.email);
    console.log(user);
    if (!user || user.role !== 'admin') {
      return res.status(NOTADMIN).json({ message });
    } 

    req.user = decoded.data;
  } catch (err) {
    return res.status(NOTADMIN).json({ message });
  }

  next();
};

module.exports = {
  getUsers,
  userCreate,
  validateUser,
  checkEmail,
  checkAdmin,
};
