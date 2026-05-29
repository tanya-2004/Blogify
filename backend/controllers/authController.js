const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🛡️ Generate JWT (only user id in payload)
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// 📝 Signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Pass plain password – model pre-save will hash it
    const newUser = new User({ username, email, passwordHash: password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
};

// 🔐 Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Login failed due to server error' });
  }
};

// 👤 Get current user (using req.userId from middleware)
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch user data' });
  }
};

// 🔄 Update settings
exports.updateSettings = async (req, res) => {
  try {
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
      if (key in req.body) updates[key] = req.body[key];
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    // Prevent email/username duplicates (basic check – you may improve with validation)
    if (updates.email) {
      const existing = await User.findOne({ email: updates.email, _id: { $ne: req.userId } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }
    if (updates.username) {
      const existing = await User.findOne({ username: updates.username, _id: { $ne: req.userId } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Username already taken' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.status(200).json({ success: true, message: 'User updated', user: updatedUser });
  } catch (err) {
    console.error('Update settings error:', err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};