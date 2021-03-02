const jwt = require('jsonwebtoken');

const errInexistente = 400;
const errInvalid = 401;
const messageInexistente = { message: 'Invalid entries. Try again.' };
const messageInvalid = { message: 'jwt malformed' };
const segredo = 'cabeça';

const createValidation = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization;

  try {
    jwt.verify(token, segredo);
  } catch (error) {
      return res.status(errInvalid).json(messageInvalid);
  }
  if (!name || !ingredients || !preparation) {
    return res.status(errInexistente).json(messageInexistente);
  }
  if (!token) {
    return res.status(errInvalid).json(messageInvalid);
  }
  next();
};

module.exports = {
  createValidation,
}