const { MongoClient } = require('mongodb');

let connection;

const DB_NAME = 'Cookmaster';
const DB_URI = `mongodb://localhost:27017${DB_NAME}`;
// const EVALUATOR_URI = `mongodb://mongodb:27017${DB_NAME}`;

module.exports = async function (collection) {
  connection = connection || (await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }));
  return connection.db(DB_NAME).collection(collection);
};