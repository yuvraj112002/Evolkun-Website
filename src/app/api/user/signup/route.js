import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongoose";
import User from "@models/User";
import { sendOtpEmail } from "@lib/mailer"; // create this function
import { generateOtp } from "@lib/otp"; // create this utility
import { cooldownOtp } from "@lib/coolDownOtp";

export async function POST(req) {
  try {
    
    const body = await req.json();
    console.log(body);
    const { name, email, password, phone } = body;

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    // ✅ CASE 1: If user exists and is verified
    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ message: "Email already registered",success:false });
    }
      const cooldownCheck = cooldownOtp(existingUser?.lastOtpSent);
  if (!cooldownCheck.allowed) {
    return NextResponse.json({ message: cooldownCheck.message ,success:false}, { status: cooldownCheck.status });
  }
    const otp = generateOtp();
    console.log(otp)
    const cookieStore = await cookies();
   
    cookieStore.set("verify_email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 10 * 60 * 1000, // 10 min
      path: "/",
    });

    // ✅ CASE 2: If user exists but not verified → update and resend OTP
    if (existingUser && !existingUser.isVerified) {
      existingUser.name = name;
      existingUser.password = password;
      existingUser.phoneNumber = phone;
      existingUser.otp = otp;
      existingUser.otpExpires = Date.now() + 5 * 60 * 1000;
      existingUser.lastOtpSent = Date.now();
      existingUser.deleteAt = new Date(Date.now() + 10 * 60 * 1000);
      await existingUser.save();

      await sendOtpEmail(email, otp);
      return NextResponse.json({
        message: "OTP re-sent. Please verify your email.",
        success:true
      });
    }

    // Case 3 : if it was new user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber:phone,
      otp, //Otp is stored in encrypted format
      otpExpires: new Date(Date.now() + 5 * 60 * 1000), // 5 min,
      lastOtpSent: new Date(), // if user didn't verify them in 10min than we are deleting their data
      deleteAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json(
      { message: "OTP sent to email. Please verify." ,
        success:true
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Registration failed",success:false, error: err.message },
      { status: 500 }
    );
  }
}
