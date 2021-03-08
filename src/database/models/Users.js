const Crud = require('./Crud');

class Users extends Crud {
  constructor() {
    super('users');
  }

  async create(queryParams) {
    const productCreated = await super.create(queryParams);
    return productCreated;
  }
}

module.exports = Users;
