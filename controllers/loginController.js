const { Router } = require('express');
const jwt = require('jsonwebtoken');
const loginValidate = require('../middlewares/loginValidate');

const router = Router();

const OK = 200;
const InternalError = 500;

router.post('/', loginValidate, async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const secret = 'mysecret';

    const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
    return res.status(OK).send({ token });
  } catch (err) {
    console.log(err);
    return res.status(InternalError).send(err);
  }
});

module.exports = router;