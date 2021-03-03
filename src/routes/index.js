const express = require('express');
const middlewares = require('../middlewares');
const usersRoutes = require('./usersRoutes');
const controllers = require('../controllers/session');

const routes = express.Router();

routes.post('/login', controllers.login);

routes.use('/users', usersRoutes);
// routes.use('/recipes', recipesRoutes);

routes.use(middlewares.handleError);

module.exports = routes;
