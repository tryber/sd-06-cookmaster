const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const UsersService = require('../services/UsersService');
const {
  checkNewUserFields,
  checkEmailRepetition,
  validateEmail,
  validateAdmin,
} = require('../middlewares');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

function checkRole(path) {
  return path.substring(1) === 'admin' ? 'admin' : 'user';
}

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
    const { name, email, password } = request.body;
    const role = checkRole(request.path);
    const registeredUser = await UsersService.create(name, email, password, role);
    response.status(CREATED).json(registeredUser);
  });

  router.post('/admin',
    checkNewUserFields,
    validateEmail,
    validateJWT,
    validateAdmin,
    async (request, response) => {
      const { name, email, password } = request.body;
      const role = checkRole(request.path);
      const registeredAdmin = await UsersService.create(name, email, password, role);
      response.status(CREATED).json(registeredAdmin);
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
