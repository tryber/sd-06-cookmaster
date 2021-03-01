const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');

const UserService = require('../service/UserService');
const { validateField, userExist } = require('../middlewares/validations');
const { validateFields, inputsFormatValidation } = require('../auth/validateJWT');

const router = Router();
const CREATED = 201;
const OK = 200;

router.post('/users', validateField, userExist, rescue(async (req, res) => {
  const user = req.body;
  const insertedId = await UserService.registerUser(user);
  return res.status(CREATED).json(insertedId);
}));

router.post('/login', validateFields, inputsFormatValidation, rescue((async (req, res) => {
  const user = req.body;
  const secret = 'secretToken';

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return res.status(OK).json({ token });
})));

module.exports = router;