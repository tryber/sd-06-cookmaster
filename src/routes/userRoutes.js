const { Router } = require('express');

const userControler = require('../controllers/UserControllers');

const userRoutes = Router();

userRoutes.post('/', userControler.createUserControler);

module.exports = userRoutes;
