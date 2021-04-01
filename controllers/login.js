const express = require('express');

const routers = express.Router();
const { createToken } = require('../middleware/tokenJWT');
const {
  postBarLogin,
} = require('../services/usersService');

routers.post('/', async (req, res) => {
  try {
    const user = await postBarLogin(req.body);
    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(error.status).json(error);
  }
});

module.exports = routers;