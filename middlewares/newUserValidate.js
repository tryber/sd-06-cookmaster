function validate(name, email, password) {
  let result = true;
  // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = regex.test(email);

  switch (true) {
    case (!name): result = false; break;
    case (!validEmail): result = false; break;
    case (!password): result = false; break;
    default: return null;
  }
  return result;
} 

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;
  const BADREQUEST = 400;

  const valid = validate(name, email, password);

  if (valid === false) {
    return res.status(BADREQUEST).send({
      message: 'Invalid entries. Try again.',
    });
  }
  req.body.role = 'user';
  if (req.path === '/admin') {
    req.body.role = 'admin';
  }

next();
};
