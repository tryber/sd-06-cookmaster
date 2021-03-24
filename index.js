const bodyParser = require('body-parser');
const express = require('express');
const { user } = require('./controller/userController');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', user);

app.get('/', (request, response) => response.send());

app.listen(3000, () => console.log('listening on port 3000!'));
