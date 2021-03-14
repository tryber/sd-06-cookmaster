const { Router } = require('express');
const bodyParser = require('body-parser');

const getRecipesMiddleware = require('../middlewares/getRecipesMiddleware');
const validateTokenMiddleware = require('../middlewares/validateTokenMiddleware');
const createRecipeMiddleware = require('../middlewares/createRecipeMiddleware');
const getRecipesByIdMiddleware = require('../middlewares/getRecipesByIdMiddleware');

const router = new Router();

// good practice
router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

router.post('/', validateTokenMiddleware, createRecipeMiddleware, async (_req, _res) => {});

router.get('/', getRecipesMiddleware, async (_req, _res) => {});

router.get('/:id', getRecipesByIdMiddleware, async (_req, _res) => {});

module.exports = router;