const { Router } = require('express');
const { validateLogin, userExistence } = require('../Middlewares/validateLogin');

const router = new Router();

router.post('/', validateLogin, userExistence);

module.exports = router;
