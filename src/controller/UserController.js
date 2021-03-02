const { Router } = require('express');
const service = require('../service/UserService');
const { validateUser } = require('../middlewares/UserMiddleware'); 

const UserController = new Router();
const OK = 200;
const CREATED = 201;
// const UNPROCESSABLE_ENTITY = 422;

// Get All Users
UserController.get('/', async (req, res) => {
  const users = await service.getAll();
  res.status(OK).json({ Users: users });
});

// // Find Product by ID
// UserController.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status, result } = await service.findById(id);
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   res.status(OK).json(result);
// });

// Create New Product
UserController.post('/', validateUser, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await service.create(name, email, password);

  res.status(CREATED).json(user);
});

// // Update Product
// UserController.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;

//   const { status, result } = await service.update(id, name, quantity);
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   res.status(OK).json(result);
// });

// Delete Product
// UserController.delete('/:id', async (req, res) => {
//   const { id } = req.params;
  
//   const { status, result } = await service.remove(id);
//   if (status === 'NOK') {
//     return res.status(UNPROCESSABLE_ENTITY).json(responseError(result));
//   }
//   res.status(OK).json(result);
// });

// const responseError = (message) => {
//   return { err: { code: 'invalid_data', message } };
// };

module.exports = UserController;
