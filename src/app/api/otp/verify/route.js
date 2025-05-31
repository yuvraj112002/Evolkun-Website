// Structure: /app/api/otp/verify/route.js
import Otp from "@/models/Otp";
import User from "@/models/User";
import generateToken from "@/lib/generateToken";
import connectDB from "@lib/db";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, otp } = await req.json();
  if (!email || !otp)
    return Response.json(
      { success: false, message: "Email and OTP are required" },
      { status: 400 }
    );
  await connectDB();
  const otpRecord = await Otp.findOne({ email });
  if (!otpRecord)
    return Response.json(
      { success: false, message: "OTP not found" },
      { status: 400 }
    );

  if (otpRecord.expiresAt < new Date()) {
    await Otp.deleteOne({ email });
    return Response.json(
      { success: false, message: "OTP expired" },
      { status: 400 }
    );
  }

  if (otpRecord.otp !== otp)
    return Response.json(
      { success: false, message: "Invalid OTP" },
      { status: 400 }
    );

  await Otp.deleteOne({ email });
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      name: email.split("@")[0],
      email,
      authType: "email",
    });
  }
  console.log(user);
  const token = generateToken(user);

  // setTokenCookie(token)
  // ✅ Set cookie using the cookies() API
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 , // 7 days
    path: "/",
  });

  // ✅ Return response
  return new Response(
    JSON.stringify({
      success: true,
      message: "OTP verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
