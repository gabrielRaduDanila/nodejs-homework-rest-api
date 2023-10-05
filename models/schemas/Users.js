const { Schema, model } = require('mongoose');
const bCrypt = require('bcryptjs');
// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const passwordRegex =
//   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const Joi = require('joi');

const user = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    // minlength: 8,
    // match: [
    //   passwordRegex,
    //   'The password must contain a minimum of 8 characters,  at least one letter, one number and one special character',
    // ],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    // match: [emailRegex, 'Invalid email address'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
});

user.methods.setPass = function (pass) {
  this.password = bCrypt.hashSync(pass, bCrypt.genSaltSync(6));
};

// user.methods.isSamePass = function (pass) {
//   return bCrypt.compareSync(pass, this.pass);
// };

const User = model('user', user);

const userSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
    .error(
      new Error(
        'The password must contain a minimum of 8 characters, at least one letter, one number, and one special character'
      )
    )
    .required(),
});

module.exports = { User, userSchema };
