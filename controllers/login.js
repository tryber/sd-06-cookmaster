const express = require('express');

const routers = express.Router();
const { createToken } = require('../middleware/tokenJWT');
const {
  postBarLogin,
} = require('../services/usersService');

routers.post('/', async (req, res) => {
  try {
    const user = await postBarLogin(req.body);
    if (!user) { return res.status(401).json({ message: 'Incorrect username or password' }); }
    const token = createToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json(error);
  }
});

module.exports = routers;