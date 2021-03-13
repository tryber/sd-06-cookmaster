const { Router } = require('express');
const { usersMiddlewares: users } = require('../middlewares');

const router = Router();

router.post('/', users.verifyBodyCreate, users.create);

router.post('/admin', users.verifyIsAdmin, users.createAdmin);

module.exports = router;
