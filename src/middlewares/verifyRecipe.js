const BAD_REQUEST = 400;

const register = async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  
  if (!name || !ingredients || !preparation) {
    return response.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }
  
  next();
}; 

module.exports = {
  register,
};