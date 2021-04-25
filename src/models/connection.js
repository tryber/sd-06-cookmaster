const {
  MongoClient,
} = require('mongodb');

// const MONGODB_URL = 'mongodb://localhost:27017/StoreManager';
const MONGODB_URL = 'mongodb://mongodb:27017/StoreManager';
const DATABASE = 'Cookmaster';

const connection = () => MongoClient
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => conn.db(DATABASE))
  .catch((_err) => {
    process.exit();
  });

module.exports = connection;
