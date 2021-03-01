const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controller/UsersController');
const RecipesController = require('./controller/RecipesController');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', UsersController, RecipesController);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
