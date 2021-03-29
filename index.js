const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routers = require('./src/routers');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/', routers);

app.use('/images', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
