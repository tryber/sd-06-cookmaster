const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Trybe Code
app.get('/', (request, response) => {
  response.send();
});

// My Code
app.use(bodyParser.json());
