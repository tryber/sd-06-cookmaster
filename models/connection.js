const { MongoClient } =require('mongodb');

const MONGO_DB_URL_LOCAL = 'mongodb://localhost:27017/Cookmaster';
const MONGO_DB_URL_EVALUATOR = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL_LOCAL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then((con) => con.db(DB_NAME)).catch((err) => process.exit());

module.exports = connection;
