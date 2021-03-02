const { Router } = require('express');

const validateUsersData = require('../middlewares/validateUsersData');
const UsersController = require('../controllers/UsersController');

const usersController = new UsersController();

const usersRouter = Router();

usersRouter.post('/', validateUsersData, usersController.create);

module.exports = usersRouter;