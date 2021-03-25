const express = require('express');
const bodyParser = require('body-parser');
// const multer = require('multer');

const app = express();

// const upload = multer({ dest: 'uploads/' });

const status404 = 404;

const usersRouter = require('./controllers/routeUsers');
const loginRouter = require('./controllers/loginRouter');
const recipesRouter = require('./controllers/recipesRouter');

const port3000 = 3000;
const port = parseInt(process.env.PORT, 10) || port3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//----------------------------------------------------------

app.use('/users', usersRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

// app.post('/upload', upload.single('file'), (req, res) => {
//   res.send('ok').status(200);
// });

app.all('*', (_req, res) => {
  res.status(status404).json({ 
  message: 'Rota não Encontrada' });
});

app.listen(port, () => console.log(`Example app listening on ${port}!`));
