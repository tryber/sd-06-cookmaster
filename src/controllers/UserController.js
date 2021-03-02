const User = require('../database/models/User');

const HashProvider = require('../providers/hashProvider');

const CreateUserService = require('../services/CreateUserService');

class UserController {
  async create(request, response) {
    this.count += 1;
    const { name, email, password, role } = request.body;

    const userModel = new User();
    const hashProvider = new HashProvider();
    const createUserService = new CreateUserService(userModel, hashProvider);

    const userToCreate = { name, email, password, role };

    const user = await createUserService.execute(userToCreate);

    const CREATED = 201;

    return response.status(CREATED).json({ user });
  }
}

module.exports = UserController;
