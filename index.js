const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// 1 
app.use('/users', UsersController);
// 1

app.listen(port, () => console.log(`Start http://localhost:${port}`));
