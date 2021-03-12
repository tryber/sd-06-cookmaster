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
    recipeNotFound: {
        message: 'recipe not found',      
    },
    MissingAuthToken: {
        message: 'missing auth token',
    },
};

const status = {
    badRequest: 400,
    conflict: 409,
    created: 201,
    unauthorized: 401,
    OK: 200,
    NotFound: 404,
    NoContent: 204,
};

module.exports = {
    messages,
    status,
  };