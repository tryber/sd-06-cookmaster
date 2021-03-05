const { Router } = require('express');
const { SignInValidations, SignIn } = require('../services/LoginServices');
const { GenerateUserToken } = require('../services/LoginServices/GenerateUserToken');
const status = require('../utils/status');

const route = Router();

route.post('/',
 SignInValidations.checkSchema,
 SignIn,
 GenerateUserToken,
 async (_req, res) => {
   const { token } = res.locals;
   console.log(token);
   return res.status(status.OK).json({ token });
 });

 route.use('/', async (err, _req, res, _next) => {
    console.log('err', err);
   res.status(err.status)
   .json({ message: err.message });
  });

module.exports = route;
