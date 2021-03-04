const { Router } = require('express');

const routes = Router();
const CookerServices = require('../services/CookerServices');

routes.post('/', CookerServices.creatingValidCooker);

module.exports = routes;