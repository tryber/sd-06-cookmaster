const express = require('express');
const { json } = require('body-parser');
const { usersRouter } = require('./controllers/users');

const app = express();
const port = 3000;

app.use(json());
app.use('/users', usersRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send({ message: 'ok' }));

app.listen(port, () => console.log(`App listening on port ${port}!`));
