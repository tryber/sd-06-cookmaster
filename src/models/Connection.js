const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.IS_LOCAL
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

exports.connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
