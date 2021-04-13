const { validateLoginFields } = require('../Schemas/loginSchema');
const { findByEmailAndPassword } = require('../Models/userModels');
const createToken = require('../auth/createToken');

const SUCCESS = 200;
const UNAUTHORIZED = 401;

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const verify = validateLoginFields(email, password);

  if (verify.code) return res.status(verify.code).send({ message: verify.message });

  next();
};

const userExistence = async (req, res, next) => {
  const { email, password } = req.body;

  const payload = await findByEmailAndPassword(email, password);

  if (!payload) return res.status(UNAUTHORIZED).send({ message: 'Incorrect username or password' });

  const token = createToken(payload);

  res.status(SUCCESS).json({ token });

  return next();
};

module.exports = {
  validateLogin,
  userExistence,
};
