const { Router } = require('express');

const { loginControler } = require('../controllers/LoginController');
const { loginValidate } = require('../middlewares/loginValidadte');

const loginRoutes = Router();

loginRoutes.post('/', loginValidate, loginControler);

module.exports = loginRoutes;