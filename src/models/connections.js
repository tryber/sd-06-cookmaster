const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://localhost:27017/Cookmaster';
// const MONGO_DB_URL = 'mongodb://mongodb:27017/Cookmaster';
const DATABASE = 'Cookmaster';

const connection = () => MongoClient.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((conn) => conn.db(DATABASE))
  .catch((_err) => {
    process.exit();
  });

module.exports = connection; 