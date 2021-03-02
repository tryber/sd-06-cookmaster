require('dotenv');

const express = require('express');
require('express-async-errors');

const uploadConfig = require('./config/upload');

const appRoutes = require('./routes');
const errorMiddleware = require('./middlewares/handleErrors');

const server = express();

server.use(express.json());

server.use('/images', express.static(uploadConfig.uploadsFolder));

server.get('/', (_request, response) => {
  response.send();
});

server.use(appRoutes);

server.use(errorMiddleware);

const SERVER_PORT = 3000;

server.listen(SERVER_PORT, () => console.log('Server Started'));
