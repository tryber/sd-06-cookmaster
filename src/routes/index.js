const { Router } = require('express');

const usersRouter = require('./users');
const sessionsRouter = require('./sessions');
const recipesRouter = require('./recipes');

const router = Router();

router.use('/users', usersRouter);
router.use('/recipes', recipesRouter);
router.use(sessionsRouter);

module.exports = router;
