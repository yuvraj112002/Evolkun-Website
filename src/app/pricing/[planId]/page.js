"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PricingCard from "@/components/PricingCard";
import styles from "@/styles/modules/pricing.module.scss";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-toastify";
import FeatureCard from "@/components/FeautureCard";
function isValidMongoId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}
const features = [
  {
    title: "World’s best checkout",
    description:
      "Shopify checkout converts 15% better on average than other commerce platforms.",
  },
  {
    title: "In-person selling",
    description:
      "Sell in person and keep inventory in sync with online sales—all with <strong>Shopify POS</strong>.",
  },
  {
    title: "Multiple sales channels",
    description:
      "Promote and sell products on Instagram, TikTok, Google, and other channels.",
  },
  {
    title: "In-depth analytics",
    description:
      "Access reports to track store performance and identify optimisation opportunities.",
  },
  {
    title: "Commerce apps",
    description:
      "Use apps for everything from product sourcing to customizing your store.",
  },
];
export default function PricingPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { planId } = useParams();
  const [planSet, setPlanSet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/signin");
      return;
    }

    if (!planId) {
      router.push("/survey-page");
      return;
    }

    const fetchPlanFromBackend = async (id) => {
      try {
        const res = await fetch(`/api/get-single-plan/${id}`);
        const data = await res.json();
        if (!data.success) {
          toast.error(data?.message || "Failed to fetch plan");
          router.push("/");
          return;
        }
        setPlanSet(data.plan);
      } catch (err) {
        console.error("Error fetching plan:", err);
        router.push("/survey-page");
      } finally {
        setLoading(false);
      }
    };

    const checkAndLoadPlan = () => {
      const matchedPlan = user?.plans?.find((plan) => plan._id === planId);

      if (matchedPlan) {
        setPlanSet(matchedPlan);
        setLoading(false);
      } else {
        if (isValidMongoId(planId)) {
          fetchPlanFromBackend(planId);
        } else {
          toast.error("Invalid plan ID format");
          router.push("/profile");
          return;
        }
      }
    };

    checkAndLoadPlan();
  }, [isAuthenticated, isLoading, user?.plans, planId]);
  if (!isAuthenticated || isLoading || loading || !planSet) {
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
          <h1 className={styles.title}>
            {planSet.businessName} – Your Personalized Pricing Plan
          </h1>
          <p className={styles.subtitle}>
            Based on your inputs, here are your custom plan tiers.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {planSet.plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isPopular={index === 1} />
          ))}
        </div>
       
        
      </div>
          <FeatureCard></FeatureCard>
    </div>
  );
}
