const express = require('express');
// const bodyParser = require('body-parser');

const app = express();
const LOCALHOST_PORT = 3000;
const PORT = process.env.PORT || LOCALHOST_PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/ping', (request, response) => {
  response.status(200).send('pong!');
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
