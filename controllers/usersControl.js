const { Router } = require('express');
const { usersMiddlewares, usersVerify } = require('../middlewares');

const router = Router();

router.post('/', usersVerify.verifyBodyCreate, usersMiddlewares.create);

router.get('/');

module.exports = router;
