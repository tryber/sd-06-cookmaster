const CookerActions = require('../models/cookerActions');
const createToken = require('../auth/createToken');

const { statusCode } = require('../Dicio');

const verifyingValidLogin = async (request, response) => {
  const { email } = request.body;
  
  const { name, password, ...dataPayload } = await CookerActions.findCookerByEmail(email);
  const token = createToken(dataPayload);

  return response.status(statusCode.SUCCESS).send({ token });
};

module.exports = { verifyingValidLogin };
