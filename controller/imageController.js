const rescue = require('express-rescue');
const { Router } = require('express');
const HTTP = require('../utils/statusCodeHandler');

const imageController = Router();

imageController.get('/:id.jpeg', rescue(async (request, response) => {
  const { id } = request.params;
  response.status(HTTP.OK).sendFile(`uploads/${id}.jpeg`, { root: '.' });
}));

module.exports = {
  imageController,
};
