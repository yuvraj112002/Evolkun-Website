"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PricingCard from "@/components/PricingCard";
import styles from "@/styles/modules/pricing.module.scss";
import { useAuth } from "@/context/UserContext";

export default function PricingPage() {
  const [plans, setPlans] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const router = useRouter();
  const { isAuthenticated,isLoading } = useAuth();
  console.log(isAuthenticated)
  console.log("pricing page rendering");

  // console.log(isLoading,"akdnaf")
  useEffect(() => {
    if(isLoading){
      return;
    }
    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    const storedPlans = localStorage.getItem("pricingPlans");
    console.log(JSON.parse(storedPlans))
    // const generatedAt =   localStorage.getItem("pricingGeneratedAt");
    const generatedAt = true
    if (storedPlans && generatedAt) {
      setPlans(JSON.parse(storedPlans));
      console.log("object")
      // Calculate remaining time (2 hours cooldown)
      const now = Date.now();
      const cooldown = 2 * 60 * 60 * 1000; // 2 hours in ms
      const elapsed = now - parseInt(generatedAt, 10);
      const timeLeft = cooldown - elapsed;

      if (timeLeft > 0) {
        setRemainingTime(timeLeft);
      } else {
        setRemainingTime(0); // Allow new generation
      }
    } else {
      router.push("/survey-page");
    }
  }, [isAuthenticated, router,isLoading]);

  // ⏱ Auto-decrement countdown timer
  useEffect(() => {
    if (!remainingTime) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (!prev || prev <= 1000) {
          clearInterval(interval);
          return null;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);
  // Format remaining time
  const formatCountdown = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
  };

  if (!isAuthenticated || plans.length === 0) {
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

        <div
          className={`${styles.cooldownBanner} ${
            remainingTime <= 0 ? styles.ready : ""
          }`}
        >
          {remainingTime > 0 ? (
            <>
              ⏳ You can generate a new plan in{" "}
              <strong>{formatCountdown(remainingTime)}</strong>.
            </>
          ) : (
            <span style={{ color: "#28a745", fontWeight: "600" }}>
              ✅ You can now generate a new pricing plan!
            </span>
          )}
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
