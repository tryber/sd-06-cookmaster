module.exports = (err, _req, res, _next) => {
  console.error(err.message);
    if (err.message === 'Invalid entries. Try again.') {
      return res.status(400).json({ message: err.message });
    }    
  
    if (err.message === 'All fields must be filled'
        || err.message === 'Incorrect username or password') {
      return res.status(401).json({ message: err.message });
    }    
   
    if (err.message === 'Email already registered') {
      return res.status(409).json({ message: err.message });
    }    
    
    if (err.message === 'Usuário não encontrado') {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: 'Erro interno' });
};
