const connection = require('./src/models/connection');

connection().then((db) => db.collection('users')
  .insertOne({
    name: 'admin', 
    email: 'root@email.com', 
    password: 'admin', 
    role: 'admin',
  }));

// db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
