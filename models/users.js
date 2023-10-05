const { User, userSchema } = require('./schemas/Users');
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const passport = require('passport');
const SECRET = process.env.SECRET;

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

const loginUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  const isSamePass = user.isSamePass(password);
  if (isSamePass) {
    const payload = {
      id: user.id,
      email: user.email,
      admin: false,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: '1w' });
    console.log(user);
    user.setToken(token);
    return {
      statusCode: 200,
      message: {
        token,
        user: {
          email,
          subscription: user.subscription,
        },
      },
    };
  } else {
    return {
      statusCode: 401,
      message: 'Email or pass is wrong',
    };
  }
};

module.exports = { signupUser, loginUser };
