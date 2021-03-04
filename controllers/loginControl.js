const { Router } = require('express');
const { usersMiddlewares: auth, usersVerify: valid } = require('../middlewares');

const router = Router();

router.post('/', valid.verifyBodyLogin, auth.generateToken);

router.get('/');

module.exports = router;
