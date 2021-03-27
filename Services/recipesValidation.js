const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const errInexistente = 400;
const errInvalid = 401;
const notFound = 404;
const removed = 204;
const messageInexistente = { message: 'Invalid entries. Try again.' };
const messageInvalid = { message: 'jwt malformed' };
const messageNotFound = { message: 'recipe not found' };
const missToken = { message: 'missing auth token' };
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

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const idValid = ObjectId.isValid(id);
  if (!idValid) {
    return res.status(notFound).json(messageNotFound);
  }
  if (idValid !== true) {
    return res.status(notFound).json(messageNotFound);
  }
  next();
};

const updateValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(errInvalid).json(missToken);
  }
  try {
    jwt.verify(token, segredo);
  } catch (error) {
    return res.status(errInvalid).json(messageInvalid);
  }
  next();
};

const removeValidation = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    return res.status(removed).send();
  }
  try {
    jwt.verify(token, segredo);
  } catch (error) {
    return res.status(errInvalid).json(missToken);
  }
  next();
};

module.exports = {
  idValidation,
  createValidation,
  updateValidation,
  removeValidation,
};