const { MongoClient } = require('mongodb');

const isEvaluator = false;

const MONGO_DB_URL = (isEvaluator) ? 'mongodb://mongodb:27017/Cookmaster'
  : 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((_err) => {
    process.exit();
  });

module.exports = connection;
