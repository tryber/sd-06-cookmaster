const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routers');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/', routers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});


app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
