export const checkIfExist = (prop: string) => {
  const exist = prop !== undefined;
  const isNotEmpty = prop !== null && prop !== '';
  return exist && isNotEmpty
};

export const checkEmailIsValid = (email: string) => {
  const regExEmail = /^\S+@\S+\.\S+$/;
  const isString = typeof(email) === 'string';
  const isValid = regExEmail.test(email);
  return isString && isValid
}

export const checkPasswordIsValid = (password: string) => {
  const isString = typeof(password) === 'string';
  const isValid = password.length >= 5;

  return isString && isValid
};

export const checkNameIsValid = (name: string) => {
  const isString = typeof(name) === 'string';
  return isString
};