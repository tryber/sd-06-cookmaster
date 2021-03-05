const { Router } = require('express');
const { loginVefiry: valid } = require('../middlewares');

const router = Router();

router.post('/', valid.verifyBodyLogin, valid.generateToken);

router.get('/');

module.exports = router;
