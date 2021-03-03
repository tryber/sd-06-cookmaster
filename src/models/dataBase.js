// const SERVIDOR = 'localhost';
const SERVIDOR = 'mongodb';

// çs.xça.sç.

const mongoose = require('mongoose');

mongoose.connect(`mongodb://${SERVIDOR}/Cookmaster`, { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
