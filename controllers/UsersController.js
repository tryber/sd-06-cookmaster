const User = require('../models/UsersModel');
const CreateUsersService = require('../services/CreateUsersService');

class UsersController {
  async create(req, res) {
    const user = new User();
    console.log(this);
    const createUsersService = new CreateUsersService(user);
    const { name, email, password, role } = req.body;
    const newUser = await createUsersService.execute({ name, email, password, role });
    return res.status(201).json(newUser);
  }
}

module.exports = UsersController;
