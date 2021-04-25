const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { routerLogin, routerUsers, routerRecipes } = require('./controllers');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());
app.use('/users', routerUsers);
app.use('/login', routerLogin);
app.use('/recipes', routerRecipes);

app.use('/images', express.static(path.join(__dirname, 'uploads')));
// referência: https://stackoverflow.com/questions/10434001/static-files-with-express-js

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));