const { MongoClient } = require('mongodb');

// ** conexão do banco local ** 
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; 
// ** conexão do banco para o avaliador funcionar **
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DB_NAME))
    .catch(() => {
      process.exit();
    });

module.exports = connection;