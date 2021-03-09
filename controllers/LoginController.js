const { Router } = require('express');
const Login = require('../services/LoginService');

const router = Router();
const statusOk = 200;

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  
  const answer = await Login.verifyUser({ email, password });
  if (answer.err) return res.status(answer.code).json(answer.err);

  return res.status(statusOk)
    .json({ token: answer });
});

module.exports = router;