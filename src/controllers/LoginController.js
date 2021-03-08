const { Router } = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const { loginToken } = require('../middlewares');
const Users = require('../services/UsersService');

const secret = 'seusecretdetoken';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const SUCCESS = 200;

const router = new Router();
router.use(bodyParser.json());

router.post('/', loginToken, rescue(async (req, res) => {
  const { email } = req.body;
  const getEmail = await Users.getEmail(email);

  const token = jwt.sign({ getEmail }, secret, jwtConfig);

  res.status(SUCCESS).json({ token });
}));

module.exports = router;
