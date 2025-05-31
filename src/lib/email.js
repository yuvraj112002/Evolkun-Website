// "use server"
import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,         // smtp.hostinger.com
    port: Number(process.env.SMTP_PORT), // must be a number like 465
    secure: true,                        // true for port 465 (SSL)
    auth: {
      user: process.env.SMTP_MAIL,       // info@evolkun.com
      pass: "Zxcvbnm@$54321",   // correct password (not your Hostinger login, but email-specific password)
    },
    logger: true,  // ✅ Logs full SMTP details
  debug: true,   // ✅ Enables SMTP protocol output
  });

  const options = {
    from: `"Evolkun" <${process.env.SMTP_MAIL}>`, // Optional display name
    to: email,
    subject,
    html: message,
  };

  await transporter.sendMail(options);
};
