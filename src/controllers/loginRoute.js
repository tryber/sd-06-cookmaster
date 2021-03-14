const { Router } = require('express');
const bodyParser = require('body-parser');

const validateLogin = require('../middlewares/validateLoginMiddleware');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateLogin, async (_req, _res) => {});

module.exports = router;
