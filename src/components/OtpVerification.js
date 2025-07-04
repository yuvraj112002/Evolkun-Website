"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/UserContext";

import styles from "@/styles/modules/OtpVerification.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function OTPVerification() {
  const { verifyOtp, resendOtp } = useAuth();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const pendingEmail = localStorage.getItem("pendingEmail");
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      router.push("/signin")
    }
  }, [router]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const data = await verifyOtp(email, otp);
      if (data.success) {
        localStorage.removeItem("pendingEmail");
        toast.success("✅OTP verified successfully");
        window.location.href = "/";
        return;
      } else{
        toast.error(data.message||"Invalid OTP. Please try again.");
      }
      
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const data = await resendOtp(email);
      if (data.success) {
        toast.success("✅OTP resent to your email");
        localStorage.removeItem("pendingEmail");
      } else{
        toast.error(data?.message || "❌Failed to resend OTP. Please try again.");
      }
      
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form onSubmit={handleVerifyOtp} className={styles.form}>
      <div className={styles.infoText}>
        <p>We&apos;ve sent a verification code to</p>
        <strong>{email}</strong>
      </div>

      <div>
        <label htmlFor="otp" className={styles.label}>
          Verification Code
        </label>
        <input
          id="otp"
          type="text"
          placeholder="Enter 6-digit code"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
          maxLength={6}
          disabled={isVerifying}
          required
          className={styles.input}
        />
      </div>

      <button type="submit" disabled={isVerifying} className={styles.button}>
        {isVerifying ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className={styles.spinner}></div>
            <span>Verifying...</span>
          </div>
        ) : (
          "Verify"
        )}
      </button>

      <div className={styles.resendText}>
        <p>
          Didn&apos;t receive a code?
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend"}
          </button>
        </p>
      </div>
    </form>
  );
}
