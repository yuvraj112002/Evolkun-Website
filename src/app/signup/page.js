"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import AuthDivider from "@/components/AuthDivider";
import EmailForm from "@/components/EmailForm";
import styles from "./Signup.module.scss";

export default function SignupPage() {
  const { isAuthenticated, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);


  return (
     <div className={styles.container}>
    <AuthCard title="Create your account" subtitle="Sign up to get started">
      <div className={styles.inner}>
        <GoogleButton  isLoading={isGoogleLoading} />
        <AuthDivider />
        <EmailForm />
        <div className={styles.bottomLink}>
          <p>
            Already have an account?{" "}
            <Link href="/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthCard>
  </div>
  );
}
