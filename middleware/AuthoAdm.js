const { getBarId } = require('../services/recipesService');

const authoAdm = async (req, res, next) => {
  const { idRecipe } = req.params;
  const { _id: idUser, role } = req.payload;
  const { userId: getId } = await getBarId(idRecipe);

  if (getId !== idUser || role !== 'admin') {
    return res.status(401).json({ message: 'missing auth token' });
  }
  return next();
};

module.exports = {
  authoAdm,
};
