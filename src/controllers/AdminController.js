const User = require('../database/models/User');

const HashProvider = require('../providers/hashProvider');

const CreateAdminService = require('../services/CreateAdminService');

class AdminController {
  async create(request, response) {
    this.count += 1;
    const { name, email, password } = request.body;

    const userModel = new User();
    const hashProvider = new HashProvider();
    const createAdminService = new CreateAdminService(userModel, hashProvider);

    const adminToCreate = { name, email, password };

    const newProduct = await createAdminService.execute(adminToCreate);

    const CREATED = 201;

    return response.status(CREATED).json(newProduct);
  }
}

module.exports = AdminController;
