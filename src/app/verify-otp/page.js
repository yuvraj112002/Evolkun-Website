"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import AuthCard from "@/components/AuthCard";
import OTPVerification from "@/components/OtpVerification";
import styles from "./VerifyOTP.module.scss";

export default function VerifyOTPPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }

    const pendingEmail = localStorage.getItem("pendingEmail");
    if (!pendingEmail) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.container}>
      <AuthCard title="Verify your email">
        <OTPVerification />
        <div className={styles.backLink}>
          <Link href="/login">Back to sign in</Link>
        </div>
      </AuthCard>
    </div>
  );
}
