const mongoose = require('mongoose');

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

    // 👤 Privacy & Interaction Settings
    profilePublic: { type: Boolean, default: true },
    showEmail: { type: Boolean, default: false },
    allowComments: { type: Boolean, default: true },
    moderateComments: { type: Boolean, default: true },

    // 📬 Notification Settings
    emailNotifications: { type: Boolean, default: true },
    commentNotifications: { type: Boolean, default: true },
    followNotifications: { type: Boolean, default: false },
    weeklyDigest: { type: Boolean, default: true },

    // 🌐 UI Preferences
    theme: { type: String, default: 'cosmic' },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' },

    // 📝 Blog Config
    blogTitle: { type: String, trim: true, maxlength: 100 },
    blogDescription: { type: String, trim: true, maxlength: 500 },
    postsPerPage: { type: Number, default: 10, min: 1, max: 100 },
    allowSubscriptions: { type: Boolean, default: true },

    // 📰 Publishing Defaults
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
    enableAutoSave: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);