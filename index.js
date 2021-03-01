const express = require('express');

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/usersController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
