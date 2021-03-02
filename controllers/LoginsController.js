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

  const user = await Users.getByEmailAndPassword(email, password);
  if (!user) {
    return { message: 'Incorrect username or password' };
  } // Será validado que não é possível fazer login com um email inválido
  
  return null;
};

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  // 
  const err = await validation(email, password);
  if (err) return res.status(ERRO401).json(err);
  //

  const userEmail = await Users.getByEmail(email);
  const token = createToken(userEmail);
 
  res.status(SUCCESS).json({ token });
});

module.exports = router;