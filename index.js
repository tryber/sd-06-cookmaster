const express = require('express');

const appRoutes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(appRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const SERVER_PORT = 3000;

app.listen(SERVER_PORT, () => {
  console.log('API ONLINE... 3000');
});
