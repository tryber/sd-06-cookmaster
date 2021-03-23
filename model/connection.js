const { MongoClient } = require('mongodb');

const dotenv = require('dotenv').config();

const { DB_NAME } = dotenv.parsed;
const MONGO_DB_URI = 'mongodb://mongodb:27017/Cookmaster';
// const MONGO_DB_URI = 'mongodb://localhost:27017/Cookmaster';

let connection;

const getCollection = async (collectionName) => {
  const connect = await MongoClient.connect(
    MONGO_DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );

  connection = connect || connection;

  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = { getCollection };
