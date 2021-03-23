const status = [
  {
    OK: {
      code: 200,
      message: 'thats ok!',
    },
  },
  {
    CREATED: {
      code: 201,
      message: 'created!',
    },
  },
  {
    BAD_REQUEST: {
      code: 400,
      message: 'Invalid entries. Try again',
    },
  },
  {
    NOT_FOUND: {
      code: 404,
      message: 'Invalid entries. Try again',
    },
  },
  {
    CONFLICT: {
      code: 409,
      message: 'Email already registered',
    },
  },
];

module.exports = {
  status: status[0],
};
