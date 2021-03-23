const { Router } = require('express');
const { verifyEmailFormat } = require('../service/UserValidations');
const { rightPassword } = require('../service/userServices');
const createToken = require('../auth/createToken');

const router = Router();
const SUCCESS = 200;

const err = {
  status: 401,
  messageObject: {
    message: '',
  },
};

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  const emailFormat = verifyEmailFormat(email);
  const userRefPassword = await rightPassword(password);
  if (!email || !password) {
    err.messageObject.message = 'All fields must be filled';
    return next(err);
  }
  if (!emailFormat || !userRefPassword) {
    err.messageObject.message = 'Incorrect username or password';
    return next(err);
  }
  const { password: passwordDB, ...userWithoutPassword } = userRefPassword;
  const tokenGenered = createToken(userWithoutPassword);
  return res.status(SUCCESS).json({ token: tokenGenered });
});

module.exports = router;
