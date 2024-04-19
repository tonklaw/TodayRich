import { User } from '../models/userModel.js';

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
}

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  try {
    const user = await User.findOne({ name: username }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({
      name: username,
      password
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedToken();

  const options = {
    expires: new Date(Date.now() + (process.env.TOKEN_EXPIRE * 24 * 60 * 60 * 1000)),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    _id: user._id,
    name: user.name,
    role: user.role,
    token 
  });
}