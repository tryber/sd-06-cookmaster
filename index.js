const express = require('express');
const bodyParser = require('body-parser');
const { usersRouter } = require('./controllers/userController');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(3000, () => console.log('Listening to port 3000'));
