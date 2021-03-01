const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_req, res) => res.send('Hello World!'));

app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
