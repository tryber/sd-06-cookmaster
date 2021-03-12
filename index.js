const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');

const controllerUser = require('./controllers/controllerUser');
const controllerRecipe = require('./controllers/controllerRecipe');
const controllerLogin = require('./controllers/controllerLogin');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', controllerUser);
app.use('/login', controllerLogin);
app.use('/recipes', controllerRecipe);

// app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json(err.message);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
