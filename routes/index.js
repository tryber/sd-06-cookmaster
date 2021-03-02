const express = require('express');
const middlewares = require('../middlewares');
const usersRoutes = require('./usersRoutes');

const routes = express.Router();

routes.use('/users', usersRoutes);
// routes.use('/recipes', recipesRoutes);

routes.use(middlewares.handleError);

module.exports = routes;
