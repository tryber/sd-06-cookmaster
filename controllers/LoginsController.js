const { Router } = require('express');
const Users = require('../models/Users');
const createToken = require('../auth/createToken');

const router = Router();

const SUCCESS = 200;
const ERRO401 = 401;

const smsAllFields = { message: 'All fields must be filled' };

router.get('/', async (_req, res) => {
  const user = await Users.getAll();

  res.status(SUCCESS).json({ user });
});

const validation = async (email, password) => {
  if (!email) {
    return smsAllFields;
  } // Será validado que o campo "email" é obrigatório
  
  if (!password) {
    return smsAllFields;
  } // Será validado que o campo "senha" é obrigatório

  return null;
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // 
  const err = await validation(email, password);
  if (err) return res.status(ERRO401).json(err);
  // 

  const user = await Users.getByEmailAndPassword(email, password);
  if (!user) { 
    return res.status(ERRO401).json({ message: 'Incorrect username or password' });
  } // Será validado que não é possível fazer login com um email inválido

  const { _id } = user;
  const token = createToken({ userId: _id, email });
  res.status(SUCCESS).json({ token });
});

module.exports = router;