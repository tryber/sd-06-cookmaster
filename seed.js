// colocar query do MongoDB
const { db } = require('mongodb');

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
