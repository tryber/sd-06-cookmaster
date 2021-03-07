const { Router } = require('express');

const routes = Router();
const checkData = require('../middlewares/userMiddlewares');
const CookerServices = require('../services/CookerServices');

const dataValidation = [
  checkData.fieldExists,
  checkData.validEmail,
  checkData.emailReplicant,
];

routes.post('/', dataValidation, CookerServices.creatingValidCooker);

module.exports = routes;