function validateFields(name, email, password) {
  let response = true;

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const validEmail = emailRegex.test(email);

  switch (true) {
    case (!name || typeof name !== 'string'): response = 404; break;
    case (!validEmail): response = 404; break;
    case (!password || typeof password !== 'string'): response = 404; break;
    default: return null;
  }

  return response;
}

module.exports = async (req, res, next) => {
  const { name, email, password } = req.body;

  const BAD_REQUEST = 400;

  const validFields = validateFields(name, email, password);

  if (validFields === 404) {
      return res.status(BAD_REQUEST).send({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};
