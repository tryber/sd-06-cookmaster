const { Router } = require('express');

const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

const appRoutes = Router();

appRoutes.use('/users', userRoutes);
appRoutes.use('/login', loginRoutes);

module.exports = appRoutes;