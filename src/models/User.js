import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
    otpExpires: Date,
    lastOtpSent: Date,
    deleteAt: {
      type: Date,
      expires: 600, // Auto-delete after 10 minutes
    },
  },
  { timestamps: true }
);

// 🔐 Pre-save Hook: Hash password and OTP
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified('otp') && this.otp) {
    this.otp = await bcrypt.hash(this.otp, 10);
  }

  next();
});

// 🔐 Instance Method: Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Prevent model overwrite on hot reload
export default mongoose.models.User || mongoose.model('User', userSchema);