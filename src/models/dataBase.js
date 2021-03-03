const SERVIDOR = 'localhost';
// const SERVIDOR = 'mongodb';

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${SERVIDOR}/Cookmaster`, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
