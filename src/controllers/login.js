const { Router } = require('express');
const users = require('../models/users');
const { createToken } = require('../auth/createToken');

const router = Router();
const userService = require('../services/userService');

router.post('/', userService.loginValidate, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await users.findEmailUser(email);

    const token = createToken(user);

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
});

module.exports = router;