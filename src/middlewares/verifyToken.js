const UNAUTH = 401;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(UNAUTH).json({ message: 'missing auth token' });

  next();
};