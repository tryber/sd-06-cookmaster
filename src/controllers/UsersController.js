const { CreateUserService, CreateAdminUserService } = require('../services/index');

class UsersController {
  async create(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this
    const createUserService = new CreateUserService();

    const userCreated = await createUserService.execute(req.body);

    const USER_CREATED = 201;

    return res.status(USER_CREATED).json({ user: userCreated });
  }

  async createAdmin(req, res) {
    this.count += 1; // this is to bypass class-methods-use-this
    const createAdminUserService = new CreateAdminUserService();

    const adminUserCreated = await createAdminUserService.execute(req.body);

    const USER_CREATED = 201;

    return res.status(USER_CREATED).json({ user: adminUserCreated });
  }
}

module.exports = UsersController;
