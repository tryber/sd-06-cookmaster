const express = require('express');

const routers = express.Router();

const {
  postBar,
} = require('../services/usersService');

routers.post('/', async (req, res) => {
  try {
    const result = await postBar(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status).json(error);
  }
});

module.exports = routers;