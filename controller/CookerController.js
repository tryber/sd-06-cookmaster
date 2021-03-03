const { Router } = require('express');

const routes = Router();
const cookerActions = require('../models/cookerActions');

// no Majik NUMBER
const SUCCESS_CREATED = 201;

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  const { insertedId } = await cookerActions.createCooker(name, email, password);
  const newUser = {
    _id: insertedId,
    role: 'user',
    name,
    email,
    password,
  };
  return response.status(SUCCESS_CREATED).send(newUser);
});

module.exports = routes;