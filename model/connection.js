const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017';
//  avaliador

let connection = null;
const getConnection = async (collectionName) => {
  connection = connection || (await MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));
  return connection.db(DB_NAME).collection(collectionName);
};

module.exports = getConnection;