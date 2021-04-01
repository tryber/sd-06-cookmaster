const msgC = 'All fields must be filled';
const msgB = 'Incorrect username or password';

function verifyPassWord(request, response, next) {
  const { email, password } = request.body;
  console.log(email, password);
  if (!password) {
    return response.status(401).json({ message: msgC });
  }
   if (password.length < 5) {
    return response.status(401).json({ message: msgB });
  }
  if (!email) {
    return response.status(401).json({ message: msgC });
  }
  const regex = /^[a-z0-9.]+@[a-z]+[a-z0-9]*\.[a-z]+(\.[a-z]+)?$/i;
  if (!regex.test(email)) {
  return response.status(401).json({ message: msgB });
  }
  next();
}

 module.exports = {
   verifyPassWord,
 };