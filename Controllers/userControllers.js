const services = require('../Services/userServices');

const create = async (name, email, password) => services.create(name, email, password);

module.exports = {
  create,
};
