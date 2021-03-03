const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then((con) => con.db(DB_NAME)).catch((err) => {
  console.log(err);
  process.exit();
});

module.exports = connection;
