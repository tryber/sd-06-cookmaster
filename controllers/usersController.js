const { Router } = require('express');
const { createUser } = require('../services/usersServices');
const { validateNewUser,
  validateDuplicateEmail, validateToken } = require('../middlewares');

const router = Router();

const CREATED = 201;
const DFT_ERROR = 400;
const FORBIDDEN = 403;

router.post('/', validateNewUser, validateDuplicateEmail, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = await createUser({ name, email, password, role });

    return res.status(CREATED).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

router.post('/admin', validateToken, validateDuplicateEmail, validateNewUser, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(FORBIDDEN).send({
        message: 'Only admins can register new admins',
        });
    }
    const { name, email, password, role } = req.body;
    const newUser = await createUser({ name, email, password, role });

    return res.status(CREATED).send(newUser);
  } catch (e) {
    console.log(e);
    res.status(DFT_ERROR).send(e);
  }
});

module.exports = router;