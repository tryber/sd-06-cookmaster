 const { Router } = require('express');
 const { userRegisterValidation } = require('../middlewares/userRegisterValidation');
 const { registerUser } = require('../service/serviceUsers');

 const route = Router();

 route.post('/', userRegisterValidation, registerUser);

 module.exports = route;