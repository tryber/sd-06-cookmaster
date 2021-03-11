import express from 'express';
import { connectDB } from './api/connection';
import { config as dotenvConfig } from 'dotenv'
import routes from './api/routes'
import multer from 'multer'

import { generateAdmin } from './seedReal';

dotenvConfig()

connectDB()
  .then(() => generateAdmin())
  .catch(() => process.exit())

const app = express();

app.use('/images', express.static(__dirname +'/uploads'))

app.use(express.json());

app.use('/', routes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => console.log('Server is running!'));