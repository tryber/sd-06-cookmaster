const { Router } = require('express');
const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
const checkLogin = require('../services/validationLogin/checkLogin');
const authMailPass = require('../services/validationLogin/authMailPass');

const router = Router();

const secret = 'secretToken';

router.post('/', checkLogin, authMailPass, rescue(async (req, res) => {
 const { email, password } = req.body;
  const OK = 200;

  const jwtSetup = {
     expiresIn: '1d',
     algorithm: 'HS256',
   };

   const token = jwt.sign({ data: { email, password } }, secret, jwtSetup);

  // const UNAUTHORIZED = 401;

  // const checkToken = jwt.verify(token, secret);
  // // console.log('checkToken', checkToken);
  // if (!checkToken) {
  //   return res.status(UNAUTHORIZED).json({ message: 'jwt malformed' });
  // }
     res.status(OK).json({ token });
}));
module.exports = router;