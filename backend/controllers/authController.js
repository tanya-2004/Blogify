const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🛡️ Generate JWT with user payload
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};


// 📝 Signup Controller
exports.signup = async (req, res) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
};

// 🔐 Login Controller
exports.login = async (req, res) => {
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // 👀 Explicitly select passwordHash if it's excluded in schema
    const user = await User.findOne({ email }).select('+passwordHash');

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // ✅ Generate token only after successful match
    const token = generateToken(user);

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('[LOGIN ERROR]', err); // Full log for debugging
    return res.status(500).json({ error: 'Login failed due to server error.' });
  }
};

// 🔐 Get Current User Data
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error('[GET /auth/me ERROR]', err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};

// 🔄 Update Settings
exports.updateSettings = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const allowedFields = [
      'username', 'email', 'bio', 'avatarUrl',
      'profilePublic', 'showEmail', 'allowComments', 'moderateComments',
      'emailNotifications', 'commentNotifications', 'followNotifications', 'weeklyDigest',
      'theme', 'language', 'timezone',
      'blogTitle', 'blogDescription', 'postsPerPage', 'allowSubscriptions',
      'defaultVisibility', 'defaultCategory', 'enableAutoSave'
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (key in req.body) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update.' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ msg: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error('[SETTINGS ERROR]', err);
    res.status(500).json({ error: 'Update failed' });
  }
};