const { Router } = require('express');
const newuserValidate = require('../middlewares/newUserValidate');
const validateExistingEmail = require('../middlewares/validateExistingEmail');
const { createUser } = require('../services/userServices');

const router = Router();

const CREATED = 201;
const DFTERROR = 400;

router.post('/', newuserValidate, validateExistingEmail, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await createUser({ name, email, password, role });

    return res.status(CREATED).send(user);
  } catch (err) {
    console.log(err);
    return res.status(DFTERROR).send(err);
  }
});

module.exports = router;