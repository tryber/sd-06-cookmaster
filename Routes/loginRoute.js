const { Router } = require('express');
const { validateLogin, tokenCreator } = require('../Middlewares/validateLogin');

const router = new Router();

router.post('/', validateLogin, tokenCreator);

module.exports = router;
