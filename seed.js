const connection = require('./models/connection');

const adm = { name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };

connection().then((db) => db.collection('users'). insertOne(adm));
