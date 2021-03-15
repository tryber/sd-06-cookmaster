const { Router } = require('express');

const userRoutes = require('./user.routes');
const sessionRoutes = require('./session.routes');
const recipesRoutes = require('./recipes.routes');

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/login', sessionRoutes);
appRoutes.use('/recipes', recipesRoutes);

module.exports = appRoutes;
