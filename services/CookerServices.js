const CookerActions = require('../models/cookerActions');

const checkData = require('../middlewares');

const { statusCode } = require('../Dicio');

const creatingValidCooker = async (request, response) => {
  const { name, email, password } = request.body;
  checkData.fieldExists(name, email, password, response);
  checkData.validEmail(email, response);
  checkData.emailReplicant(email, response);

  const { insertedId } = await CookerActions.createCooker(name, email, password);
  const newUser = { _id: insertedId, role: 'user', name, email, password };
  return response.status(statusCode.SUCCESS_CREATED).send({ user: newUser });
};

module.exports = { creatingValidCooker };