const express = require('express');
const { tudoCerto } = require('../uteis/codeStatus');

const loginRouter = express.Router();

/** verificando usuario e senha! */
loginRouter.get('/', async (req, res) => {
  const result = await console.log('verificando informações do usuario');
  return res.status(tudoCerto).json(result);
});
