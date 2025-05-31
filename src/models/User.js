import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  authType: {
    type: String,
    enum: ['google', 'email'],
    required: true
  },
    lastPlanGeneratedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// ✅ This avoids OverwriteModelError on hot reloads
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;