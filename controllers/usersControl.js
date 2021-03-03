const { Router } = require('express');
const { usersServices, usersValidations } = require('../services');

const router = Router();

router.post('/', usersValidations.verifyBody, usersServices.create);

router.get('/');

module.exports = router;
