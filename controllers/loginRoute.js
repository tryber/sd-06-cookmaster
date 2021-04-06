const { Router } = require('express');
const bodyParser = require('body-parser');
const loginValidation = require('../middlewares/validateLoginMiddleware');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', loginValidation, async (_req, _res) => {});

module.exports = router;
