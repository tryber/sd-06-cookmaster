const express = require('express');
const bodyParser = require('body-parser');
const routerController = require('./controllers/UsersController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/users', routerController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
response.send();
});

app.listen(PORT, () => console.log('Ouvindo porta 3000')); 