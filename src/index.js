const express = require('express');
const bodyParser = require('body-parser');

const log = require('./middlewares/log');
const UserController = require('./controller/UserController');
const LoginController = require('./controller/LoginController');
const RecipeController = require('./controller/RecipeController');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const NOT_FOUND = 404;

app.use(express.static(`${__dirname}uploads/`));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(log);

app.use('/users', UserController);
app.use('/login', LoginController);
app.use('/recipes', RecipeController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.all('*', (req, res) => res.status(NOT_FOUND).json({ message: 'Route not found' }));

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
