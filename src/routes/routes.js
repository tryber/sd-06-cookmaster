const { Router } = require('express');

const appRoutes = Router();

appRoutes.post('/users', (request, response) => {
  response.send({ message: "users"});
});

appRoutes.post('/login', (request, response) => {
  response.send({ message: "login" });
});

// appRoutes.post('/recipes', salesRoutes);
// appRoutes.get('/recipes/:id', salesRoutes);
// appRoutes.delete('/recipes/:id', salesRoutes);

// appRoutes.put('/recipes/:id/image/', salesRoutes);

// appRoutes.use(handleError);

module.exports = appRoutes;