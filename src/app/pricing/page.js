"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PricingCard from "@/components/PricingCard";
import styles from "@/styles/modules/pricing.module.scss";
import { useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-up");
    }
  }, [isSignedIn, isLoaded, router]);


  useEffect(() => {
  if (isSignedIn) {
    const storedPlans = localStorage.getItem("pricingPlans");
    if (storedPlans) {
      setPlans(JSON.parse(storedPlans));
    } else {
      router.push("/survey");
    }
  }
}, [isSignedIn, router]);


 if (!isLoaded || !isSignedIn || plans.length === 0) {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
}

  return (
    <div className={styles.pricingPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Personalized Pricing Plans</h1>
          <p className={styles.subtitle}>
            Based on your requirements, here are our recommended packages
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isPopular={index === 1} />
          ))}
        </div>
      </div>
    </div>
  );
}