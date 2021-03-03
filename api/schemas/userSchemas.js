const validate = (name, email, password) => {
  const invalidEntries = 'Invalid entries. Try again.';
  const emailMask = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  
  if (!name) throw Error(invalidEntries);
  if (!email) throw Error(invalidEntries);
  if (!password) throw Error(invalidEntries);
  if (emailMask.test(email) === false) throw Error(invalidEntries);

  return true;
};

module.exports = { validate };
