const { Router } = require('express');
const jwt = require('jsonwebtoken');

const secret = 'milhoComLevesTonsDeVerdeMesmoSendoBemAmarelado';

const { validateLogin, findUser } = require('../services/login_Service');

const router = Router();

const OK = 200;

router.post('/', validateLogin, async (req, res) => {
  const { email } = req.body;
  const user = await findUser(email);
  const token = jwt.sign({ data: user }, secret);

  res.status(OK).json({ token });
});

module.exports = router;