// const { ObjectId } = require('bson');

// const magicNumberzero = 0;
const status400 = 400;
const msgInvalidEntries = 'Invalid entries. Try again.';

// import querys
// const {
//   findByemail,
// } = require('../models/queryLogin');
// -------------------------------------------

const nameExists = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
      return res.status(status400).json({ message: msgTryAgain });
  }
  next();
};

const ingredientsExists = (req, res, next) => {
  const { ingredients } = req.body;
  if (!ingredients) {
    return res.status(status400).json({ message: msgInvalidEntries });
  }
  next();
};

const preparationExists = (req, res, next) => {
  const { preparation } = req.body;
  if (!preparation) {
    return res.status(status400).json({ message: msgInvalidEntries });
  }
  next();
};

module.exports = {
  nameExists,
  ingredientsExists,
  preparationExists,
};
