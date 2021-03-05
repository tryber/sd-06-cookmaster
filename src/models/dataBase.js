const mongoose = require('mongoose');

// const SERVIDOR = 'localhost';
// const SERVIDOR = 'mongodb';

// 'mongodb://mongodb:27017/Cookmaster';

// mongoose.connect(`mongodb://${SERVIDOR}:27017/Cookmaster`, { 
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useCreateIndex: true,
// });

mongoose.connect('mongodb://mongodb:27017/Cookmaster', { 
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
