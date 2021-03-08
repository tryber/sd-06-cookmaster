const objAnswer = {
    err_body: {
        err1: { message: 'Invalid entries. Try again.' },
        err2: { message: 'Email already registered' },
        err3: { message: 'All fields must be filled' },
        err4: { message: 'Incorrect username or password' },
    },
    err_token: {
        err1: { message: 'jwt malformed' },
        err2: { message: 'missing auth token' },
    },
    err_search: { message: 'recipe not found' },
};

const status = {
    bad_request: 400,
    conflict: 409,
    created: 201,
    ok: 200,
    unauthorized: 401,
    notFound: 404,
    okNoContent: 204,
};

module.exports = { objAnswer, status };
