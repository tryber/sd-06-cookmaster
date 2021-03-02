const { Router } = require('express');
const usersRoutes = require('./usersRoutes');
const loginRoutes = require('./loginRoutes');
const recipesRoutes = require('./recipesRoutes');
const handleError = require('../middlewares/handleError');

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/login', loginRoutes);
routes.use('/recipes', recipesRoutes);
routes.use(handleError);

module.exports = routes;
