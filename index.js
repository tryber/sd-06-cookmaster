const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controller/UserController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.get('/', (_request, response) => response.send());

app.listen(port);