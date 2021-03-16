const yup = require('yup');
const { generateError } = require('../../utils/error');
const status = require('../../utils/status');

const allFilled = 'All fields must be filled';
const emailMatcher = /^[a-z0-9.]+@[a-z]+\.[a-z]+$/;

const invalidData = 'Incorrect username or password';

const SingInSchema = yup.object().shape({
  email: yup.string().matches(emailMatcher, invalidData).required(allFilled),
  password: yup.string().required(allFilled),
});

const SingInValidation = {
  async checkSchema(req, _res, next) {
    const { email, password } = req.body;
    try {
      await SingInSchema.validate({ email, password });
      next();
    } catch (err) {
      next(generateError(status.NOT_AUTHORIZED, 'Not_Authorized', err.message));
    }
  }, 

}; 

module.exports = SingInValidation;