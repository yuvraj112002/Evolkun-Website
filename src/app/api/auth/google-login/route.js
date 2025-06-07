import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import User from "@/models/User";
import generateToken from "@/lib/generateToken";
import connectDB from "@/lib/db";
import setTokenCookie from "@/lib/setTokenCookie";
const client = new OAuth2Client({
  clientId:
    process.env.GOOGLE_CLIENT_ID,
});

export async function POST(req) {
  await connectDB();
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required" },
        { status: 403 }
      );
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
       process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOneAndUpdate(
      { email },
      { profileImage: picture },
      { new: true }
    );

    if (!user) {
      user = await User.create({
        name,
        email,
        profileImage: picture,
        authType: "google",
      });
    }

    // Generate JWT token
    const jwtToken = generateToken(user);
    await setTokenCookie(jwtToken);

    return NextResponse.json({ success: true, user,message:'Login Successfull' });
  } catch (err) {
    console.error("Google login error:", err);
    return NextResponse.json(
      { success: false, message: "Invalid or expired token" },
      { status: 500 }
    );
  }
}