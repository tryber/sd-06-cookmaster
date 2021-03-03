const { Router } = require('express');

const routes = Router();
const CookerServices = require('../services/CookerServices');

// no Majik NUMBER
const SUCCESS_CREATED = 201;

routes.post('/', CookerServices.creatingValidCooker);

module.exports = routes;