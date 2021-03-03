const express = require('express');
const bodyParser = require('body-parser');
const { error } = require('./middlewares');
const { UsersController, LoginController } = require('./controllers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', UsersController);
app.use('/login', LoginController);

app.use(error);

const PORT = 3000;
app.listen(PORT, () => console.log(`O PAI TÁ ON ${PORT} VEZES!`));
