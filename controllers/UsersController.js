const { Router } = require('express');
const Users = require('../models/Users');

const router = Router();

const SUCCESS = 200;
const SUCCESS201 = 201;
const ERRO400 = 400;
const ERRO409 = 409;

const ROLE_USER = 'user';

const smsInvalidEntries = { message: 'Invalid entries. Try again.' };

router.get('/', async (_req, res) => {
  const user = await Users.getAll();

  res.status(SUCCESS).json({ user });
});

const validation = async (name, email, password) => {
  if (!name) {
    return smsInvalidEntries;
  } // Será validado que o campo "name" é obrigatório
  
  if (!email) {
    return smsInvalidEntries;
  } // Será validado que o campo "email" é obrigatório

  const mandatoryEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!mandatoryEmail.test(email)) {
    return smsInvalidEntries;
  } // Será validado que não é possível cadastrar usuário com o campo email inválido
  
  if (!password) {
    return smsInvalidEntries;
  } // Será validado que o campo "senha" é obrigatório
  
  return null;
};

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  // 
  const err = await validation(name, email, password);
  if (err) return res.status(ERRO400).json(err);
  const err2 = await Users.getByEmail(email); // Será validado que o campo "email" é único
  if (err2) return res.status(ERRO409).json({ message: 'Email already registered' }); 
  //

  const { insertedId } = await Users.create(name, email, password, ROLE_USER);
  const user = {
    _id: insertedId,
    name,
    email,
    password,
    role: ROLE_USER,
  };
  
  res.status(SUCCESS201).json({ user });
});

module.exports = router;