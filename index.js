const express = require('express');

const app = express();
const port = 3000;

const appRoutes = require('./src/routes/routes');

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(appRoutes);

app.listen(port, () => console.log(`Listening to port ${port}`));