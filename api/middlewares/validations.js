const validateName = (req, res, next) => {
  const { name } = req.body;
  
  if (!name) return res.status(401).json({ message: 'o campo name não existe' });
    
  next();
};

module.exports = {
    validateName,
};