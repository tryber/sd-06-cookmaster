const { Router } = require('express');

const UserController = require('../controllers/UserController');
const validateUserData = require('../middlewares/validateUserData');

const userController = new UserController();

const userRoutes = Router();

// userRoutes.get('/', productController.list);
// userRoutes.get('/:id', productController.show);

userRoutes.post('/', validateUserData, userController.create);

// userRoutes.put('/:id', productDataValidator, productController.update);

// userRoutes.delete('/:id', productController.delete);

module.exports = userRoutes;
