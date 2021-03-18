const ObjectId = require('mongodb');
const connection = require('./connection');

/**
 * Cria um novo usuario 
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @param {String} role 
 * @returns retorna objeto criado incluindo o numero do id
 */
const createUser = async (name, email, password, role) => {
  const result = await connection().then((db) => db.collection('users')
    .insertOne({ name, email, password, role }));
  const { insertedId } = result;
  return {
    user: { name, email, role, _id: insertedId },
  };
};

/**
 * lista de usuarios cadastrados
 * @returns lista de todos os usuarios cadastrados
 */
async function allUsers() {
  const db = await connection();
  const result = await db.collection('users').find().toArray();
  return result;
}

/**
 * Consulta de usuário pelo id
 * @param {String} id 
 * @returns Objeto contendo as informações do usuário
 */
async function findById(id) {
  const db = await connection();
  const result = await db.collection('users').findOne(ObjectId(id));
  return result;
}

/**
 * Lista de usuários pelo email
 * @param {String} email 
 * @returns objeto contendo informações do usuário
 */
const findByEmail = async (email) => {
console.log(`recebi no findByEmail ${email}`);
  const result = await connection().then((db) => db.collection('users').findOne({ email }));
  return result;
};

/**
 * Altera cadastro do usuário pelo id
 * @param {String} id 
 * @param {Objeto} dataUser 
 * @returns Retorna cadatro alterado do usuário ou nulo
 */
async function updateUser(id, dataUser) {
  const { name, email, password, role } = dataUser;
  const db = await connection();
  const result = await db.collection('users')
    .findOneAndUpdate({ _id: ObjectId(id) },
      { $set: { name, email, password, role } },
      { returnOriginal: false });
  if (!result.value) return null;
  return result.value;
}

/**
 * Remove um usuário filtrado pelo id
 * @param {String} id 
 * @returns Objeto contendo informações do excluido ou null
 */
async function removeUser(id) {
  const db = await connection();
  const result = await db.collection('users').findOneAndDelete({ _id: ObjectId(id) });
  if (!result.value) return null;
  return result.value;
}

module.exports = {
  createUser,
  allUsers,
  findById,
  findByEmail,
  updateUser,
  removeUser,
};
