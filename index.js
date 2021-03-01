const express = require('express');
const BodyParser = require('body-parser');

const { UsersRouter } = require('./src/routers');

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
