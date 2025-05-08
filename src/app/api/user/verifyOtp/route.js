import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from "@lib/mongoose";
import User from "@models/User";
import { generateToken } from '@lib/jwt';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    await connectToDatabase();

    const { otp } = await req.json();
    const cookieStore = cookies();
    const email = cookieStore.get('verify_email')?.value;

    // ✅ Edge Case: Missing OTP or email cookie
    if (!otp || !email) {
      return NextResponse.json(
        { message: 'Email and OTP are required or expired.' },
        { status: 400 }
      );
    }

    const trimmedOtp = typeof otp === 'string' ? otp.trim() : String(otp).trim();

    // ✅ Check if user exists and OTP is still valid
    const user = await User.findOne({
      email,
      otpExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(trimmedOtp, user.otp);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    // ✅ Update verification status
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    user.deleteAt = undefined;
    user.lastOtpSent = undefined;
    await user.save();

    // ✅ Clear verify_email cookie
    cookieStore.set('verify_email', '', {
      expires: new Date(0),
      path: '/',
    });

    // ✅ Set login token cookie
    const token = generateToken(user._id);
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 20, // 20 day
      path: '/',
    });

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('OTP Verification Error:', err);
    return NextResponse.json(
      { message: 'Verification failed', error: err.message },
      { status: 500 }
    );
  }
}
