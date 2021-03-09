const express = require('express');

const router = express.Router();

const controllers = require('../controllers/UsersController');
const validateUser = require('../services/ValidationUser');

router.post('/users', validateUser, controllers.createUser);

module.exports = router;
