const { errMsgs, statusCode } = require('../Dicio');
const CookerActions = require('../models/cookerActions');

async function emailReplicant(email, response) {
  const isEmail = await CookerActions.findCookerByEmail(email);

  if (isEmail) {
    return response.status(statusCode.CONFLICT)
    .json({ message: errMsgs.alreadyRegist });
  }
}

module.exports = emailReplicant;