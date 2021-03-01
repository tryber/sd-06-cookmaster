const userService = require('../services/userService')

const SUCCESS = 200;
const CREATED = 201;

const create = async(request, response, next) => {
  try {
    const { name, email, password } = request.body;
    const user = await userService.create(name, email, password);
    return response.status(CREATED).json(product);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  create
}