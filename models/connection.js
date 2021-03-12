const { MongoClient } = require('mongodb');

require('dotenv').config();

const MONGODB_URL = process.env.IS_LOCAL
  ? 'mongodb://127.0.0.1:27017'
  : 'mongodb://mongodb:27017';
const DATABASE = 'Cookmaster';

const connection = async () => MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db(DATABASE))
    .catch((_err) => {
      process.exit();
    });

module.exports = connection;
