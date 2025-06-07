import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  authType: {
    type: String,
    enum: ["google", "email"],
    required: true,
  },
  dailyPlanCount: { type: Number, default: 0 },
  lastPlanGeneratedAt: {
    type: Date,
    required: false,
  },
  plans: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedPlanSet",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ This avoids OverwriteModelError on hot reloads
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
