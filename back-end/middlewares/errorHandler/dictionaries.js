const status = {
  ok: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  unprocessableEntity: 422,
};

const codeTranslator = {
  404: 'not_found',
  422: 'invalid_data',
};

const errorMessages = {
  smallName: '"name" length must be at least 5 characters long',
};

module.exports = { status, codeTranslator, errorMessages };