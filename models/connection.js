const { MongoClient } = require('mongodb');

const DB_NAME = 'Cookmaster';
// const DB_URI = `mongodb://localhost:27017/${DB_NAME}`;
const DB_URI = `mongodb://mongodb:27017/${DB_NAME}`;

let connection;

module.exports = async (collectionName) => {
  connection = connection || (await MongoClient.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }));

  return connection.db(DB_NAME).collection(collectionName);
};
