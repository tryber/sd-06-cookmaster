module.exports = (email) => {
  const mailRegex = /^\S+@\S+$/;
  return mailRegex.test(email);
};