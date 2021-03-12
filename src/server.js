const express = require('express');

const path = require('path');

const imagesFolder = path.resolve(__dirname, 'images');

const PORT = 3000;

const appRoutes = require('./routes');

const server = express();

server.use(express.json());

server.use('/images', express.static(imagesFolder));

server.get('/', (_request, response) => {
  response.send();
});

server.use(appRoutes);

server.listen(PORT, () => console.log(`Server Started on port ${PORT}`));