const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const checkMail = require('../services/validationLogin/checkLogin');

const router = Router();

const secret = 'secretToken';

router.post('/', checkMail, rescue(async (req, res) => {
  const { email, password } = req.body;
  const OK = 200;

  const jwtSetup = {
    expiresIn: '1d',
    // algorithm: 'sha256',
  };

  const token = jwt.sign({ data: { email, password } }, secret, jwtSetup);

  return res.status(OK).json({ token });
}));

module.exports = router;