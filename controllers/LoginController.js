const Router = require('express');
const jwt = require('jsonwebtoken');
const UsersServices = require('../services/UsersServices');
const { loginValidationRules, validateLogin } = require('../middlewares/LoginValidators');

const router = Router();

const OK = 200;
const UNAUTHORIZED = 401;

const secret = 'just do go ahead';

router.post('/', loginValidationRules(), validateLogin, async (req, res) => {
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const { email, password } = req.body;

  const validPass = await UsersServices.findByPassword(password);
  if (!validPass) return res.status(UNAUTHORIZED)
    .json({ message: 'Incorrect username or password' });

  const { _id, role } = await UsersServices.findByEmail(email);

  const token = jwt.sign({ _id, role, email }, secret, jwtConfig);

  res.status(OK).json({ token });
});

module.exports = router;