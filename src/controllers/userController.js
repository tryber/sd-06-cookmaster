const jwt = require('jsonwebtoken');

const secret = 'segredo';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const service = require('../services/serviceUser');
const {
  created,
  conflict,
  badRequest,
  regexEmail,
  unauthorized,
  OK,
} = require('../utils/messages');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const role = 'user';
  if (!name || !email || !password) {
    return res.status(badRequest).json({ message: 'Invalid entries. Try again.' });
   }
  const emailNoExist = await service.emailExist(name, email, password);
  if (!regexEmail.test(email)) {
    return res.status(badRequest)
    .json({ message: 'Invalid entries. Try again.' });
  }
  if (!emailNoExist) return res.status(conflict).json({ message: 'Email already registered' });
  const newUser = await service.userCreate(name, email, password, role);
  res.status(created).json(newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(unauthorized).json({ message: 'All fields must be filled' });
  }
  if (typeof password !== 'string') {
  return res.status(unauthorized).json({ message: 'Incorrect username or password' });
  }
  const emailFounded = await service.findByEmail(email);
  if (!emailFounded || emailFounded.password !== password) {
    return res.status(unauthorized).json({ message: 'Incorrect username or password' });
  }
  // "_" serve para evitar conflito com o password do body
  const { password: _, ...userWithoutPassword } = emailFounded;
  const payload = userWithoutPassword;
  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(OK).json({ token });
};

module.exports = {
  createUser,
  loginUser,
};
