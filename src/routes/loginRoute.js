const { Router } = require('express');
const bodyParser = require('body-parser');

const { loginValidation } = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', loginValidation, createToken, async (_req, _res) => {});

module.exports = router;
