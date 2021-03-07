const messages = {
    invalidEntries: {
        message: 'Invalid entries. Try again.',
    },
    emailexisting: {
        message: 'Email already registered',
    }, 
    fieldsFilled: {
        message: 'All fields must be filled',      
    },
    invalidLogin: {
        message: 'Incorrect username or password',      
    },
    JWTMalformed: {
        message: 'jwt malformed',      
    },
};

const status = {
    badRequest: 400,
    conflict: 409,
    created: 201,
    unauthorized: 401,
    OK: 200,
};

module.exports = {
    messages,
    status,
  };