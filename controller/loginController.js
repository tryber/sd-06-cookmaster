const { Router } = require('express');
const validation = require('../service/validations/loginValidation');

const loginRouter = new Router();

loginRouter.post('/', validation.loginVerification);

loginRouter.use('/',
async (error, req, res, _next) => res.status(error.status).json({ message: error.message }));

module.exports = loginRouter;
