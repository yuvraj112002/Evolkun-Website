// Converted EmailForm.jsx (app/components/EmailForm.jsx)
"use client";
import  { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/context/UserContext";

import styles from "@/styles/modules/EmailForm.module.scss";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const EmailForm = () => {
  const { sendOtp } = useAuth();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
       toast.warn(" ⚠️ Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    try {
      const data = await sendOtp(email);
      if (data.success) {
        toast.success("OTP sent to your email");
        localStorage.setItem("pendingEmail", email);
        router.push("/verify-otp")
        return;
        // window.location.href = "/verify-otp";
      } 
      toast.error(data?.message || "Something went wrong")
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleEmailSubmit} className={styles.form}>
      <label htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? <span>Sending...</span> : <><span>Continue</span><ArrowRight /></>}
      </button>
    </form>
  );
};

export default EmailForm;