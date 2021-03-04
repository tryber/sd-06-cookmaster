module.exports = (err, _req, res, _next) => {
  console.error(err.message);
    if (err.message === 'Invalid entries. Try again.') {
      res.status(400).json({ message: err.message });
    }    
    if (err.message === 'Email already registered') {
      res
        .status(409).json({ message: err.message });
    }
      res.status(500).json({ message: 'Erro Interno' });
};
