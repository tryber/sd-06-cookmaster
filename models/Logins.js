// const connection = require('./connection');
// const User = require('./Users');
// const createToken = require('../auth/createToken');

// const ERRO401 = 401;
// const SUCCESS = 200;

// module.exports = async (req, res) => {
//   try {
//     const { email, password } = req.boby;

//     const userEmail = await User.getByEmail(email);

//     if (!email || userEmail.password !== password) {
//       return res.status(ERRO401).json({ message: 'usuario não cadastrado ou senha invalida' });
//     }

//     const token = createToken(userEmail);

//     return res.status(SUCCESS).json({ token });
//   } catch (e) {
//     console.log(e);
//     return res.status(ERRO401).json({ message: 'Erro interno', error: e });
//   }
// };

// const getAll = async () => connection().then((db) => db.collection('logins').find().toArray());

// // No banco logins precisa ter os campos Email, Senha.
// const create = async (email, password) => 
//   connection().then((db) => db.collection('logins').insertOne({ email, password }));

// const getByEmail = async (email) =>
//   connection().then((db) => db.collection('logins').findOne({ email }));

// module.exports = {
//   getAll,
//   create,
//   getByEmail,
// };