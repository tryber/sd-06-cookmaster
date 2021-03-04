const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
//  const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';

const connection = () => {
  const server = MongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('Cookmaster'))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
  return server;
};

module.exports = connection;