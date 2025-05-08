import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateOtp } from '@lib/generateOtp';
import { sendOtpEmail } from '@lib/mailer';
import { cooldownOtp } from '@lib/cooldown';
import { connectToDatabase } from "@lib/mongoose";
import User from "@models/User";

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    // ✅ 1. Missing email input
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // ✅ 2. User not found
    if (!user) {
      return NextResponse.json(
        { message: 'No user found with that email.' },
        { status: 404 }
      );
    }

    // ✅ 3. Not verified
    if (!user.isVerified) {
      return NextResponse.json(
        { message: 'Please verify your account first.' },
        { status: 403 }
      );
    }

    // ✅ 4. Cooldown check (same as resend logic)
    const cooldownCheck = cooldownOtp(user.lastOtpSent);
    if (!cooldownCheck.allowed) {
      return NextResponse.json(
        { message: cooldownCheck.message },
        { status: cooldownCheck.status }
      );
    }

    // ✅ 5. Generate and save OTP
    const otp = generateOtp(); // plain OTP for email
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 mins
    user.lastOtpSent = new Date();
    await user.save();

    await sendOtpEmail(email, otp);

    return NextResponse.json(
      {
        message: 'OTP sent to your email. Please verify to reset password.',
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Forgot Password Error:', err);
    return NextResponse.json(
      { message: 'Something went wrong', error: err.message },
      { status: 500 }
    );
  }
}
