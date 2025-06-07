// Structure: /app/api/otp/resend/route.js
import Otp from "@/models/Otp";
import {sendEmail} from "@/lib/email";
import generateOTP from "@/lib/generateOtp";
import { isAuthenticated } from "@lib/auth";
import connectDB from "@lib/db";
function generateOtpEmailTemplate(otp) {
  return ` <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
    <h2 style="color: #4f46e5;">Evolkun Verification Code</h2>
    <p>Hello,</p>
    <p>You requested a one-time password (OTP) to verify your email address.</p>
    <p style="font-size: 18px; font-weight: bold; background-color: #f3f4f6; padding: 10px 15px; display: inline-block; border-radius: 6px; color: #111827;">
      ${otp}
    </p>
    <p>This code is valid for the next 5 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
    <hr style="margin-top: 30px; margin-bottom: 20px;" />
    <p style="font-size: 12px; color: #6b7280;">This email was sent by Evolkun Digital Agency. Please do not reply to this message.</p>
  </div>
  `;
}
export async function POST(req) {
  const { email } = await req.json();
  if (!email) return Response.json({ success: false, message: "Email is required" }, { status: 400 });
try {
  await connectDB(); // ✅ Always call this before DB operations
  
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  
  await Otp.findOneAndUpdate(
    { email },
    { email, otp, expiresAt },
    { upsert: true, new: true }
  );
  
  await sendEmail({
    email,
    subject: "🔐 Your OTP Code for Verification",
    message: generateOtpEmailTemplate(otp),
  });
  
  return Response.json({ success: true, message: "OTP resent successfully" });
} catch (error) {
  return Response.json({ success: false, message: "Something went wrong" });
  
}
}