const { Router } = require('express');

const userRoutes = require('./userRoutes');

const appRoutes = Router();

appRoutes.use('/users', userRoutes);

module.exports = appRoutes;