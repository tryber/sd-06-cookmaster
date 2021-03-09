// colocar query do MongoDB // requisito6 sobre permissão do usuario admin

db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
