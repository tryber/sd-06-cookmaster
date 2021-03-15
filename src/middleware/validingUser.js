const connection = require('../service/connection');
const { invalido, jaExiste } = require('../uteis/codeStatus');
const { entradaInvalida, informacaoInvalida } = require('../uteis/messages');

/**
 * Valida informações que serão enviadas pela requisição são null
 * valida se email ja existe
 * @param {*} Object contendo Email, nome e password
 */
const validingBody = async (req, res, next) => {
  const { email, name, password } = req.body;
  const regex = /\S+@\S+.\S+/;
  if (!regex.test(email) || !name || !password) {
    return res.status(invalido).json(entradaInvalida);
  }
  next();
};

/**
 * valida se email ja existe
 * @param {*} Object contendo Email
 */
const seeEmail = async (req, res, next) => {
  const { email } = req.body;
  const result = await connection().then((db) => db.collection('users').findOne({ email }));
  if (result) return res.status(jaExiste).json(informacaoInvalida);
  next();
};

module.exports = {
  validingBody,
  seeEmail,
};
