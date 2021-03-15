const { Router } = require('express');
const jwt = require('jsonwebtoken');
const validateLogin = require('../middlewares/validateLogin');

const router = Router();

const secret = 'mysecrettoken';

router.post('/', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: { email, password } }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
});

module.exports = router;