const express = require('express');
const { createToken } = require('../utils/auth');
const { findByEmail } = require('../models/userModel');
const {
  validatePresenceOfEmailPassword,
  validateLoginEmail,
} = require('../middlewares/validation');

const router = express.Router();

router.post(
  '/',
  validatePresenceOfEmailPassword,
  validateLoginEmail,
  async (req, res) => {
    try {
      const { password, email } = req.body;

      const user = await findByEmail(email);
      if (!user || !user.password || user.password !== password) {
        return res
          .status(401)
          .json({ message: 'Incorrect username or password' });
      }
      const { password: _, ...userWithoutPassword } = user;
      const token = await createToken(userWithoutPassword);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(501).json({
        message: 'Error to login',
        error,
      });
    }
  }
);

module.exports = router;
