import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectToDatabase from '@lib/db';
import User from '@models/User';
import { generateOtp } from '@lib/generateOtp'; // assumes you have a helper for this
import { sendOtpEmail } from '@lib/mailer';     // assumes you have a mailer function
import { cooldownOtp } from '@lib/cooldown';    // from earlier conversion

export async function POST() {
  try {
    await connectToDatabase();

    const cookieStore = cookies();
    const email = cookieStore.get('verify_email')?.value;

    // ✅ Missing email cookie
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required. Please register again.' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // ✅ User not found
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // ✅ Already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'User already verified' },
        { status: 400 }
      );
    }

    // ✅ TTL expired
    if (user?.deleteAt && user.deleteAt < new Date()) {
      return NextResponse.json(
        { message: 'Account expired. Please register again.' },
        { status: 410 }
      );
    }

    // ✅ Cooldown check (60 sec)
    const cooldownCheck = cooldownOtp(user?.lastOtpSent);
    if (!cooldownCheck.allowed) {
      return NextResponse.json(
        { message: cooldownCheck.message },
        { status: cooldownCheck.status }
      );
    }

    // ✅ Generate and send new OTP
    const now = Date.now();
    const otp = generateOtp(); // Your own function that returns a 6-digit string

    user.otp = await bcrypt.hash(otp, 10); // Encrypt OTP if needed
    user.otpExpires = new Date(now + 5 * 60 * 1000); // 5 minutes
    user.lastOtpSent = new Date();
    await user.save();

    await sendOtpEmail(email, otp); // Plain OTP is sent by email

    return NextResponse.json(
      { message: 'OTP resent successfully' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Resend OTP Error:', err);
    return NextResponse.json(
      { message: 'Failed to resend OTP', error: err.message },
      { status: 500 }
    );
  }
}
