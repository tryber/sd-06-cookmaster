const { Router } = require('express');
const bodyParser = require('body-parser');
const middlewareTokenValidation = require('../middlewares/validateTokenMiddleware');
const middlewareRecipeCreation = require('../middlewares/createRecipeMiddleware');

const router = new Router();

router.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
router.post('/', middlewareTokenValidation, middlewareRecipeCreation, async (_req, _res) => {});

module.exports = router;
