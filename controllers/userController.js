const express = require('express');
const { addUser } = require('../models/userModel');
const {
  validatePresenceOfUsernameEmailPassword,
  validateEmail,
  validateEmailIsUnique,
} = require('../middlewares/validation');

const router = express.Router();

router.post(
  '/',
  validatePresenceOfUsernameEmailPassword,
  validateEmail,
  validateEmailIsUnique,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await addUser(email, password, name);
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(501).json({
        message: 'Erro ao salvar o usuário no banco',
        error,
      });
    }
  }
);

module.exports = router;
