const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const log = require('./middlewares/logger');
const Users = require('./controllers/userController');

const PORT = 3000;

app.use(bodyParser.json());
app.use(log);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', Users.createUser);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
