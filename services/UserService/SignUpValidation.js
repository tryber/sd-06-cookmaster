const yup = require('yup');
const User = require('../../models/userModel');
const { generateError } = require('../../utils/error');
const status = require('../../utils/status');

const emailMatcher = /^[a-z0-9.]+@[a-z]+\.[a-z]+$/;

const inValidEntries = 'Invalid entries. Try again.';

const signUpSchema = yup.object().shape({
  name: yup.string().required(inValidEntries),
  email: yup.string().matches(emailMatcher, inValidEntries).required(inValidEntries),
  password: yup.string().required(inValidEntries),
});

const signUpValidation = {
  async checkDuplicateEmail(req, _res, next) {
    const { email } = req.body;
    try {
      const userExists = await User.findOneByEmail(email);
      if (userExists) throw generateError(status.CONFLICT, 'Conflict', 'Email already registered');
      next();
    } catch (err) {
      next(err);
    }
  },  
  async checkUserData(req, _res, next) {
    const { name, email, password } = req.body;
    try {
      await signUpSchema.validate({ name, email, password });
      next();
    } catch (err) {
      next(generateError(status.BAD_REQUEST, 'Bad_request', err.message));
    }
  },

};

module.exports = {
  signUpValidation,
};
