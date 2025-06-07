"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import AuthCard from "@/components/AuthCard";
import GoogleButton from "@/components/GoogleButton";
import AuthDivider from "@/components/AuthDivider";
import EmailForm from "@/components/EmailForm";
import Link from "next/link";
import styles from "./login.module.scss";

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isGoogleLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);


  return (
    <div className={styles.container}>
      <AuthCard 
        title="Sign in to App" 
        subtitle="Welcome back! Please sign in to continue"
      >
        <div className={styles.inner}>
          <GoogleButton  isLoading={isGoogleLoading} />
          <AuthDivider />
          <EmailForm />

          <div className={styles.signupLink}>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
