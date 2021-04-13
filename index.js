const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./Routes/userRoutes');
const loginRoute = require('./Routes/loginRoute');
const recipeRoutes = require('./Routes/recipeRoutes');

const app = express();
const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/recipes', recipeRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.listen(port);
