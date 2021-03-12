const { Router } = require('express');
const rescue = require('express-rescue');
const checkLogin = require('../services/validationLogin/checkLogin');
const authMailPass = require('../services/validationLogin/authMailPass');
const createToken = require('../services/validationLogin/createToken');

const router = Router();

router.post('/', checkLogin, authMailPass, rescue(async (req, res) => {
 const { _id, email, role } = req.infoUser;
  const OK = 200;

  const token = createToken({ _id, email, role });
  
    res.status(OK).json({ token });
}));
module.exports = router;