const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./controller/UserController');
const loginRouter = require('./controller/LoginController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.get('/', (_request, response) => response.send());

app.listen(port);