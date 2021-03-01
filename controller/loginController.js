const { Router } = require('express');

const LoginRouter = new Router();

const RESPONSE = 201;

LoginRouter.get('/', async (req, res) => res.status(RESPONSE).json('login router'));

module.exports = LoginRouter;
