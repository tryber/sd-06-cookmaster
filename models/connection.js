require('dotenv').config();
const { MongoClient } = require('mongodb');

const { AMBIENTE } = process.env;
const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = (AMBIENTE === 'development')
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DB_NAME))
  .catch((_err) => {
    process.exit();
  });

module.exports = connection;
