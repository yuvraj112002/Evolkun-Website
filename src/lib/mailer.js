import nodemailer from 'nodemailer';

// ✅ You don't need dotenv.config() — Next.js auto-loads .env.local
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(email, otp) {
  try {
    const response = await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Your OTP for account verification',
      html: `
        <div style="max-width: 400px; margin: 20px auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
          <h2 style="color: #333; text-align: center;">Email Verification</h2>
          <p style="font-size: 16px; color: #444; text-align: center;">
            Your OTP is: <b style="font-size: 20px; color: #1a73e8;">${otp}</b>
          </p>
          <p style="font-size: 14px; color: #777; text-align: center;">
            This OTP is valid for <b>5 minutes</b> only.
          </p>
        </div>
      `,
    });

    console.log('📩 OTP email sent:', response.messageId);
  } catch (error) {
    console.error('❌ Failed to send OTP email:', error);
    throw new Error('Email sending failed');
  }
}
