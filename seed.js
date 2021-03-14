// colocar query do MongoDB
// Desafio 6- Permissoes do usuario admin
db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });