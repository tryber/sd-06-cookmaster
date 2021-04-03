const { MongoClient } = require('mongodb');
require('dotenv').config();

const HOST = process.env.HOST || 'mongodb';
const MONGO_DB_URL = `mongodb://${HOST}:27017`;
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
