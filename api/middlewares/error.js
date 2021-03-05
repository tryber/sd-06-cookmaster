module.exports = (err, _req, res, _next) => {
  switch (true) {
    case err.message === 'Invalid entries. Try again.':
      return res.status(400).json({ message: err.message });
    case err.message === 'All fields must be filled':
      return res.status(401).json({ message: err.message });
    case err.message === 'Email already registered':
      return res.status(409).json({ message: err.message });
    case err.message === 'Usuário não encontrado':
      return res.status(401).json({ message: err.message });
    case err.message === 'jwt malformed':
      return res.status(401).json({ message: err.message });
    case err.message === 'Incorrect username or password':
      return res.status(401).json({ message: err.message });
    default: res.status(500).json({ message: 'Erro interno' });
      break;
  }
};