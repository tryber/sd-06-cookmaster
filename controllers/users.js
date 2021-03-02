const rescue = require('express-rescue');
const routes = require('express').Router();
const users = require('../services/users');

const OK = 200;
const CREATED = 201;
// const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

routes.route('/:id')
  .get(rescue(async (req, res) => {
    const { id } = req.params;
    const searchedSale = await users.findById(id);

    if (searchedSale === null || searchedSale.err) {
      return res.status(NOT_FOUND).json(searchedSale);
    }

    res.status(OK).json(searchedSale);
  }))
  .put(rescue(async (req, res) => {
    const { id } = req.params;
    const updateSale = req.body;
    const saleToUpdate = await users.update(id, updateSale);

    if (saleToUpdate.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(saleToUpdate);
    }

    res.status(OK).json(saleToUpdate);
  }))
  .delete(rescue(async (req, res) => {
    const { id } = req.params;
    const saleToDelete = await users.deleteSale(id);

    if (saleToDelete === null || saleToDelete.err) {
      return res.status(UNPROCESSABLE_ENTITY).json(saleToDelete);
    }

    res.status(OK).json(saleToDelete);
  }));

routes.route('/')
  .get(rescue(async (_req, res) => {
    const usersArray = await users.getAll();

    res.status(OK).json({ users: usersArray });
  }))
  .post(rescue(async (req, res, next) => {
    const { name, email, password } = req.body;
    const createdUser = await users.create({ name, email, password });
    
    if (createdUser.err) {
      return next({ ...createdUser.err });
    }

    res.status(CREATED).json(createdUser);
  }));

module.exports = routes;
