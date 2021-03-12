const { MongoClient } = require('mongodb');

const IS_LOCAL = false;
const MONGO_DB_URL = (IS_LOCAL)
  ? 'mongodb://localhost:27017/Cookmaster' : 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = async (collName) => {
  const conn = await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return conn.db(DB_NAME).collection(collName);
};

module.exports = connection;
