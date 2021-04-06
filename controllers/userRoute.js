const { Router } = require('express');
const bodyParser = require('body-parser');
const reqValidation = require('../middlewares/validateRequestMiddleware');
const userCreate = require('../middlewares/createUserMiddleware');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', reqValidation, userCreate, async (_req, _res) => {});

module.exports = router;
