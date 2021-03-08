const { Router } = require('express');

const UsersController = require('../controllers/UsersController'); 

const validateUserObj = require('../middlewares/validateUserObj');

const usersRouter = Router();

const usersController = new UsersController();

// usersRouter.get('/', usersController.list);
// usersRouter.get('/:id', usersController.show);
usersRouter.post('/', validateUserObj, usersController.create);
// usersRouter.put('/:id', validateUserObj, usersController.update);
// usersRouter.delete('/:id', usersController.delete);

module.exports = usersRouter;
