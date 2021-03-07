const { Router } = require('express');
const { userLoginValidation } = require('../middlewares/userLoginValidations');
const { LoginUserAndCreateToken } = require('../service/serviceLogin');

const route = Router();

route.post('/', userLoginValidation, LoginUserAndCreateToken);

module.exports = route;