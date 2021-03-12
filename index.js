const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mainRouter = require('./back-end/router/mainRouter');
const errorHandler = require('./back-end/middlewares/errorHandler');

const port = 3000;
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.use('/', mainRouter);

app.get('/', (request, response) => {
  response.send();
});

app.use('/images', express.static(path.join(__dirname, 'back-end/assets/uploads')));

app.use(errorHandler);

app.listen(port, () => console.log(`Listening to port ${port}`));
