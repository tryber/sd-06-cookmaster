const { MongoClient } = require('mongodb');

const evalautor = false;
const MONGODB_URL = evalautor
  ? 'mongodb://localhost:27017/Cookmaster'
  : 'mongodb://mongodb:27017/Cookmaster';
const DATABASE = 'Cookmaster';

const connection = () =>
  MongoClient.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((conn) => conn.db(DATABASE))
    .catch((err) => {
      console.error(err);
      process.exit();
    });

module.exports = connection;
