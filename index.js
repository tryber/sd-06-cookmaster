const express = require('express');

const appRoutes = require('./src/routes');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(appRoutes);

const SERVER_PORT = 3000;

app.listen(SERVER_PORT, () => {
  console.log('Server Started...');
});
