// Conexão com o DB

import { config as dotenvConfig } from 'dotenv'
import mongoose  from 'mongoose'

dotenvConfig()

mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

// TESTA SE A CONEXÃO FOI BEM SUCEDIDA

// TODA VEZ QUE OCORRE UM ERROR NA CONEXÃO, DISPARA A MENSAGEM
db.on('error', console.error.bind(console, 'DB connection error:'));

// A PRIMEIRA VEZ OCORRE UMA CONEXÃO BEM SUCEDIDA DISPARA A MENSAGEM
db.once('open', () => console.log('DB connection established with success!'));