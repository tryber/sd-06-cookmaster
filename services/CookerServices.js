const CookerActions = require('../models/cookerActions');

const { statusCode } = require('../Dicio');

const creatingCooker = async (request, response) => {
  const { name, email, password } = request.body;

  const { insertedId } = await CookerActions.createCooker(name, email, password);
  const newUser = { _id: insertedId, role: 'user', name, email, password };
  return response.status(statusCode.SUCCESS_CREATED).send({ user: newUser });
};

module.exports = { creatingCooker };