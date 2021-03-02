const express = require('express');
const bodyParser = require('body-parser');

const expectedError = require('./Middlewares/expectedError');
const usersController = require('./Controllers/usersController');

const app = express();
const bell = 3000;

app.use(bodyParser.json());
app.use('/users', usersController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// const OK = 200;
// app.get('/', (_req, res) => {
//   res.status(OK).json({ ok: true });
// });

app.use(expectedError);
app.listen(bell, () => console.log(`For whom the ${bell} tolls!`));
