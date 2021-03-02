module.exports = (req, res, next) => {
  try {
    return res.send({ m: 'CRIAR USUÁRIO' });
  } catch (err) {
    return next(err);
  }
};
