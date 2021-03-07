const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');

const { UsersRouter, RecipesRouter, LoginRouter } = require('./src/routers');
const { error } = require('./src/middlewares');

const { IS_LOCAL } = process.env;
const PORT_EVALUATOR = 3000;
const PORT = (IS_LOCAL)
  ? process.env.PORT
  : PORT_EVALUATOR;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(BodyParser.json());
app.use('/users', UsersRouter);
app.use('/login', LoginRouter);
app.use('/recipes', RecipesRouter);
app.use('/images', express.static(path.join(__dirname, '/uploads')));
app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
