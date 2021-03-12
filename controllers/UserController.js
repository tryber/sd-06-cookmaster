const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const UserService = require('../service/UserService');
const { validateField, userExist } = require('../middlewares/userValidations');
const { validateFields, inputsValidation } = require('../auth/validateJWT');

const router = Router();
const CREATED = 201;
const OK = 200;

router.post('/users', validateField, userExist, rescue(async (req, res) => {
  const user = req.body;
  const insertedId = await UserService.registerUser(user);
  return res.status(CREATED).json(insertedId);
}));

router.post('/login', validateFields, inputsValidation, rescue((async (req, res) => {
  const user = req.body;
  console.log(req.data);
  const secret = 'secretToken';
  // console.log('usar na rota login', user);
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  console.log(req.data);
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(OK).json({ token });
})));

module.exports = router;