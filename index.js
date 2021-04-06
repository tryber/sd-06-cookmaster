const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/User');
const loginRoutes = require('./routes/Login');
const recipeRoutes = require('./routes/Recipe');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', userRoutes);

app.use('/login', loginRoutes);

app.use('/recipes', recipeRoutes);

app.use('/images', express.static(`${__dirname}/uploads`));

const port = 3000;

app.listen(port, () => console.log(`it's a cookbook! A COOKBOOOK!! Running on port: ${port}`));
