const express = require('express');
const path = require('path');
const { json } = require('body-parser');
const { usersRouter } = require('./routes/usersRouter');
const { loginRouter } = require('./routes/loginRouter');
const { recipesRouter } = require('./routes/recipesRouter');

const app = express();
const port = 3000;

app.use(json());
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/recipes', recipesRouter);
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => response.send({ message: 'ok' }));

app.listen(port, () => console.log(`App listening on port ${port}!`));
