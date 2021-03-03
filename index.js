const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const UserService = require('./src/services/UserService');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/users', 
  rescue(UserService.validateRequestFields), 
  // rescue(UserService.thisEmailExists),
  rescue(UserService.insertUser));

app.use((err, req, res, _next) => {
  const codeStatus = (err.codeStatus) ? err.codeStatus : 500;
  res.status(codeStatus).json({ message: err.message });
});

app.listen(PORT);