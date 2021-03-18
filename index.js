const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send());

app.use(routes);

app.listen(PORT, () => console.log(`On My Way To port ${PORT}`));
