const express = require('express');
const PORT = 3000;

const appRoutes = require('./routes');
const server = express();

server.use(express.json());

server.get('/', (_request, response) => {
  response.send();
});

server.use(appRoutes);

server.listen(PORT, () => console.log(`Server Started on port ${PORT}`));