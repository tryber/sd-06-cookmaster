const User = require('../models/UsersModel');
const CreateUsersService = require('../services/CreateUsersService');
const LoginService = require('../services/LoginService');
const CreateToken = require('../auth/CreateToken');

class UsersController {
  async create(req, res) {
    const user = new User();
    console.log(this);
    const createUsersService = new CreateUsersService(user);
    const { name, email, password, role } = req.body;
    console.log(name, role);
    const newUser = await createUsersService.execute({ name, email, password, role });
    return res.status(201).json(newUser);
  }

  async login(req, res) {
    const user = new User();
    const loginService = new LoginService(user);
    console.log(this);
    const { email, password } = req.body;
    const { _id, role, name } = await loginService.execute({ email, password });
    return res.status(200).json(CreateToken({ _id, name, email, role }));
  }

}

module.exports = UsersController;
