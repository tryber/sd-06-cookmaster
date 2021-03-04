const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../services/serviceUsers');
const verifyUser = require('../services/validationUsers/verifyUser');
const mail = require('../models/modelUsers');

const CREATED = 201;

const router = Router();

router.post('/', verifyUser, rescue(async (req, res) => {
  const { name, email, password } = req.body;
  const CONFLICT = 409;
  const searcher = await mail.getByEmail({ email });
  console.log(searcher);
 if (!searcher) {
   const createdUser = await service.createUser({ name, email, password, role: 'user' });
   
   return res.status(CREATED).json({ user: createdUser });
 }
 return res.status(CONFLICT).json({ message: 'Email already registered' });
}));

module.exports = router;