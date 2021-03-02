require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.testing' : '.env',
});

console.log(process.env.MONGO_DB_URL);
