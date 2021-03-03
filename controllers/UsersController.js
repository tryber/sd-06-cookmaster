const { Router } = require('express');
const UsersService = require('../services/UsersService');
const {
  checkNewUserFields,
  checkEmailRepetition,
  validateEmail,
} = require('../middlewares');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

router.get('/', async (request, response) => {
  const users = await UsersService.getAll();
  response.status(SUCCESS).json(users);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const requestedUser = await UsersService.findById(id);

  if (requestedUser.error) {
    return response.status(NOT_FOUND).json(requestedUser.error);
  }

  response.status(SUCCESS).json(requestedUser);
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, password, role } = request.body;
  const newDataFromUser = { name, email, password, role };
  const updatedUser = await UsersService.update(id, newDataFromUser);

  if (updatedUser.error) {
    return response.status(updatedUser.error.code).json(updatedUser.error);
  }
  response.status(SUCCESS).json(updatedUser);
});

router.post('/',
  checkNewUserFields,
  checkEmailRepetition,
  validateEmail,
  async (request, response) => {
    const { name, email, password, role } = request.body;
    const registeredUser = await UsersService.create(name, email, password, role);
    response.status(CREATED).json(registeredUser);
  });

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const removedUser = await UsersService.remove(id);
  if (removedUser.error) {
    return response.status(removedUser.error.code).json(removedUser.error);
  }
  response.status(SUCCESS).json(removedUser);
});

module.exports = router;
