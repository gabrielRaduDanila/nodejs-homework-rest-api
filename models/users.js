const { User, userSchema } = require('./schemas/Users');

const signupUser = async (body) => {
  try {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user) {
      return { statusCode: 409, message: 'Email in use' };
    }
    const { error } = userSchema.validate(body);

    if (error) {
      console.error(error.message);
      return { statusCode: 400, message: `Bad Reques. ${error.message} ` };
    }

    const createdUser = new User({ email, password });
    createdUser.setPass(password);
    await createdUser.save();
    return { statusCode: 201, message: createdUser };
  } catch (err) {
    console.log(err);
    return { statusCode: 400, message: `Bad Reques` };
  }
};

module.exports = { signupUser };
