const { MongoClient } = require('mongodb');
require('dotenv').config();

const { IS_LOCAL } = process.env;

const MONGO_DB_URL = (IS_LOCAL)
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';

const DB_NAME = 'Cookmaster';

const connection = async () => MongoClient
  .connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DB_NAME));

module.exports = connection;
