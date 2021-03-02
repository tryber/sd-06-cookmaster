const rescue = require('express-rescue');
const routes = require('express').Router();
const login = require('../services/login');

routes.route('/')
  .get(rescue(async (req, res, next) => {
    const { email, password } = req.body;
    const token = await login.login({ email, password });

    if (token.err) {
      return next({ ...token.err });
    }

    res.status(200).json({ token });
  }));

module.exports = routes;
