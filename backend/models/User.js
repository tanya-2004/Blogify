const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    avatarUrl: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 300
    },
    profilePublic: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    moderateComments: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    commentNotifications: { type: Boolean, default: true },
    followNotifications: { type: Boolean, default: false },
    weeklyDigest: { type: Boolean, default: true },
    theme: { type: String, default: 'cosmic' },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },
    blogTitle: { type: String, trim: true, maxlength: 100 },
    blogDescription: { type: String, trim: true, maxlength: 500 },
    postsPerPage: { type: Number, default: 10, min: 1, max: 100 },
    allowSubscriptions: { type: Boolean, default: true },
    defaultVisibility: {
      type: String,
      enum: ['public', 'private', 'unlisted'],
      default: 'public'
    },
    defaultCategory: {
      type: String,
      enum: ['tech', 'lifestyle', 'education', 'other'],
      default: 'tech'
    },
    enableAutoSave: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// 🔐 Hash password automatically before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next();
  try {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// 🔐 Method to compare plain password with stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);