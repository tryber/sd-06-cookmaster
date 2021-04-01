const express = require('express');
const bodyParser = require('body-parser');
const UsersController = require('./controllers/UsersController');
const LoginsController = require('./controllers/LoginsController');
const RecipesController = require('./controllers/RecipesController');

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

// 2
app.use('/login', LoginsController);
// 2

// 3 
app.use('/recipes', RecipesController);
// 3 

// 10
app.use('/images', express.static(`${__dirname}/images`));
// 10

app.listen(port, () => console.log(`Start http://localhost:${port}`));
