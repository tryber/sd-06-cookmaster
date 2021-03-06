const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster'; // Local
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster'; // Server
const DB_NAME = 'Cookmaster';

const connection = async (collectionName) => {
  const connect = await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connect.db(DB_NAME).collection(collectionName);
};

module.exports = connection;
