module.exports = async (name, email, password) => {
  const emailFormatValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
  
  if(!name || !email || !password || !emailFormatValid) {
    return response.status(400).json({
      message: "Invalid entries. Try again."
    })
  }
}; 