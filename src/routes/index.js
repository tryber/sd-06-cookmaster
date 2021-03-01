const { Router } = require('express');

const userRoutes = require('./userRoutes'); 

const appRouters = Router();

appRouters.use('/users', userRoutes);

module.exports = appRouters;
