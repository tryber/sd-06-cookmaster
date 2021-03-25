const express = require('express');

const router = express.Router();

const controllers = require('../controllers/userController');
const validateUser = require('../services/userValidation');

router.post('/users', validateUser, controllers.createUser);

module.exports = router;
