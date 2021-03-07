const jwt = require('jsonwebtoken');
const CookerActions = require('../models/cookerActions');

const { statusCode, jwtSecret, jwtHeaders } = require('../Dicio');

const verifyingValidLogin = async (request, response) => {
  const { email } = request.body;
  
  const { name, password, ...dataPayload } = await CookerActions.findCookerByEmail(email);
  const token = jwt.sign(dataPayload, jwtSecret, jwtHeaders);

  return response.status(statusCode.SUCCESS).send({ token });
};

module.exports = { verifyingValidLogin };
