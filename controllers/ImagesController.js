const { Router } = require('express');
const RecipesValidations = require('../services/RecipesServices/RecipesValidations');
const VerifyUserToken = require('../services/Authorization/VerifyUserToken');
const CheckCredentials = require('../services/Authorization/CheckUserCredential');
const ImagesValidation = require('../services/imagesServices/ImagesValidation');
const status = require('../utils/status');

const route = Router();

route.get('/:filename',
    ImagesValidation.checkFilename,
    RecipesValidations.checkToken,
    VerifyUserToken,
    CheckCredentials,
    async (req, res) => {
      const { image } = res.locals;
      res.set('Content-Type', 'image/jpeg'); 
      res.status(status.OK).send(image);
    });

route.use('/', async (err, _req, res, _next) => {
  console.log(err, 'error found');
  return res.status(err.status).json({ message: err.message });
});

module.exports = route;