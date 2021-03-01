const express = require('express');

const PORT = 3000;
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./controllers/usersController');
const loginRouter = require('./controllers/loginController');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
