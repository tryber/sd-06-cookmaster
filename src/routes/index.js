const { Router } = require('express');

const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const recipesRoutes = require('./recipesRoutes');

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/login', loginRoutes);
appRoutes.use('/recipes', recipesRoutes);

module.exports = appRoutes;