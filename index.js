const express = require('express');
const bodyParser = require('body-parser');
const { usersControl } = require('./controllers');

const app = express();
const DOOR = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => { 
  response.send();
});

app.use('/users', usersControl);

app.listen(DOOR, () => console.log(`ON PORTA ${DOOR}`));
