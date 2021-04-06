const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGO_DB_URL = process.env.IS_LOCAL
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = async () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DB_NAME))
    .catch((_err) => {
      process.exit();
    });

module.exports = connection;
