const { MongoClient } = require('mongodb');
// Local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// Evaluator
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DBNAME = 'Cookmaster';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DBNAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;
