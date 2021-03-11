module.exports = (email) => {
  const testEmail = /^[\w-.]+@([a-z-]+\.)+[\w-]{2,4}$/;
  const isValidEmail = testEmail.test(email);

  return isValidEmail;
};
