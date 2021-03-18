const { Router } = require('express');
const validateJWT = require('../uteis/validingJWT');
const userService = require('../service/userService');
const {
  validingNewUser,
  checkEmail,
  validingEmail,
  validingAdm,
} = require('../middleware');

const router = Router();
const SUCCESS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

function checkRole(path) {
  return path.substring(1) === 'admin' ? 'admin' : 'user';
}

router.get('/', async (req, res) => {
  const result = await userService.getAll();
  res.status(SUCCESS).json(result);
});

router.get('/:id', async (request, response) => {
  const { id } = request.params;
  const requestedUser = await userService.findById(id);

  if (requestedUser.error) {
    return response.status(NOT_FOUND).json(requestedUser.error);
  }

  response.status(SUCCESS).json(requestedUser);
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, password, role } = request.body;
  const newDataFromUser = { name, email, password, role };
  const updatedUser = await userService.updateUserService(id, newDataFromUser);

  if (updatedUser.error) {
    return response.status(updatedUser.error.code).json(updatedUser.error);
  }
  response.status(SUCCESS).json(updatedUser);
});

router.post('/',
  validingNewUser,
  checkEmail,
  validingEmail,
  async (req, res) => {
    const { name, email, password } = req.body;
    const role = checkRole(req.path);
    const result = await userService.createUserService(name, email, password, role);
    res.status(CREATED).json(result);
  });

router.post('/admin',
  validingNewUser,
  validingEmail,
  validateJWT,
  validingAdm,
  async (request, response) => {
    const { name, email, password } = request.body;
    const role = checkRole(request.path);
    const registeredAdmin = await userService.create(name, email, password, role);
    response.status(CREATED).json(registeredAdmin);
  });

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const removedUser = await userService.remove(id);
  if (removedUser.error) {
    return response.status(removedUser.error.code).json(removedUser.error);
  }
  response.status(SUCCESS).json(removedUser);
});

module.exports = router;
