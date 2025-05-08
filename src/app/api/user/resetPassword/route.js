import { NextResponse } from 'next/server';
import connectToDatabase from '@lib/db';
import User from '@models/User';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, otp, newPassword } = await req.json();

    // ✅ 1. Input validation
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { message: 'Email, OTP, and new password are required.' },
        { status: 400 }
      );
    }

    // ✅ 2. Find user with valid OTP
    const user = await User.findOne({
      email,
      otpExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP.' },
        { status: 400 }
      );
    }

    // ✅ 3. Compare OTP
    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid OTP' },
        { status: 400 }
      );
    }

    // ✅ 4. Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.lastOtpSent = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Password reset successful. You can now login.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Reset Password Error:', err);
    return NextResponse.json(
      { message: 'Failed to reset password', error: err.message },
      { status: 500 }
    );
  }
}
