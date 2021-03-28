const { MongoClient } = require('mongodb');

// teste local
// const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// github
const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DB_NAME))
    .catch((_err) => {
      process.exit();
    });

module.exports = connection;