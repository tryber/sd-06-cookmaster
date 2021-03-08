const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { usersControl, loginControl, recipesControl } = require('./controllers');

const app = express();
const DOOR = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', usersControl);

app.use('/login', loginControl);

app.use('/recipes', recipesControl);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.listen(DOOR, () => console.log(`ON PORTA ${DOOR}`));
