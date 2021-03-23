const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DBNAME = 'Cookmaster';

const exitCode = 1;

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DBNAME))
    .catch((err) => {
      console.error(err);
      process.exit(exitCode);
    });

module.exports = connection;
