const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const path = require('path');
const UserService = require('./src/services/UserService');
const LoginService = require('./src/services/LoginService');
const RecipesController = require('./src/controllers/RecipesController');
const RecipesService = require('./src/services/RecipesService');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', 
  rescue(UserService.validateRequestFields), 
  rescue(UserService.insertUser));

app.post('/login', 
  rescue(LoginService.checkEmailAndPassword));

app.use(express.static(`${__dirname}/uploads`));

app.get('/images/:id', (req, res) => {
  const { id } = req.params;
  res.sendFile(`${__dirname}/uploads/${id}`);
});

app.use('/recipes', RecipesController);

app.use((err, req, res, _next) => {
  const codeStatus = (err.codeStatus) ? err.codeStatus : 500;
  res.status(codeStatus).json({ message: err.message });
});

app.listen(PORT);