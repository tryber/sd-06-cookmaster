const { Router } = require('express');
const User = require('../services/UserService');

const router = Router();
const statusCreate = 201;

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  
  const answer = await User.createUser({ name, email, password, role: 'user' });
  if (answer.err) return res.status(answer.code).json(answer.err);

  return res.status(statusCreate)
    .json({ user: { name, email, password, role: 'user', _id: answer.insertedId } });
});

module.exports = router;
