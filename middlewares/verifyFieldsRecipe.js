const ERR_MESSAGE = { message: 'Invalid entries. Try again.' };
const STATUS_400 = 400;

const verifyFieldsBlanks = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  if (!name || !ingredients || !preparation) {
    return response.status(STATUS_400).json(ERR_MESSAGE);
  }
  next();
};

module.exports = verifyFieldsBlanks;
