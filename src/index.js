const express = require('express');
const bodyParser = require('body-parser');

const {
  usersRouter,
  loginRouter,
  recipesRouter,
} = require('./controllers');

const app = express();

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use((req, _res, next) => {
  console.log({
    data: new Date(),
    method: req.method,
    router: req.originalUrl,
  });
  next();
});

app.use(bodyParser.json());

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

app.use((err, _req, res, _next) => {
  console.error({ err });
  res.status(500).json({ erro: 'erro interno' });
});

app.listen(PORT, () => console.log('running port', PORT));
