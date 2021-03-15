const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./users/userController');
const recipeController = require('./recipes/recipeController');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// app.use((req, res, next) => {
//   console.log({
//     method: req.method,
//     endpoint: req.originalUrl,
//   });
//   next();
// });

app.use('/', userController);
app.use('/recipes', recipeController);

app.listen(PORT, () => { console.log(`Running at ${PORT}`); });
