const { ObjectId } = require('mongodb');

const NOTFOUND = 404;
const message = 'recipe not found';
const resolveProblem = async (req, res, next) => {
  const { id } = req.params;
  if (ObjectId.isValid(id) !== true) return res.status(NOTFOUND).json({ message });
  next();
};
module.exports = resolveProblem;
