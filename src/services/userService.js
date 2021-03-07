const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const createUser = async (user) => {
  const { email, name, password, role = 'user' } = user;

  const createdUser = usersModel.createUser({ email, name, password, role });

  return createdUser;
};

const loginUser = async (user) => {
  const { email, password } = user;

  const loggedUser = await usersModel.getUserByEmailPassword(email, password);

  return loggedUser;
};

const createToken = async (user) => {
  const { _id, email, role } = user;

  const token = jwt.sign({ _id, email, role }, 'secret');

  return token;
};

const decodeToken = async (token) => {
  const decoded = jwt.decode(token);

  return decoded;
};

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'jwt malformed' });

  jwt.verify(authorization, 'secret', (err, _decoded) => {
    if (err) return res.status(401).json({ message: 'jwt malformed' });

    next();
  });
};

const verifyFields = async (request, response, next) => {
  const { email, name, password } = request.body;
  const regex = /\S+@\S+.\S+/;

  if (!regex.test(email) || !name || !password) {
    return response.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  const exists = await usersModel.getUserByEmail(email);

  if (exists) return response.status(409).json({ message: 'Email already registered' });

  next();
};

const verifyLogin = async (request, response, next) => {
  const { email, password } = request.body;
  const regex = /\S+@\S+.\S+/;

  if (!regex.test(email) || !password) {
    return response.status(401).json({
      message: 'All fields must be filled',
    });
  }

  const exists = await usersModel.getUserByEmailPassword(email, password);

  if (!exists) return response.status(401).json({ message: 'Incorrect username or password' });

  next();
};

module.exports = {
  createUser,
  verifyFields,
  verifyLogin,
  loginUser,
  createToken,
  verifyToken,
  decodeToken,
};
