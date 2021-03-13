const { Router } = require('express');
const bodyParser = require('body-parser');

const bypassMiddleware = require('../middlewares/bypassMiddleware');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const createRecipeMiddleware = require('../middlewares/createRecipeMiddleware');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateTokenMiddleware, createRecipeMiddleware, async (_req, _res) => {});

router.get('/', bypassMiddleware, async (_req, _res) => {});

module.exports = router;