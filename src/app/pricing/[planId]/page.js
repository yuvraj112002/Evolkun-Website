"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PricingCard from "@/components/PricingCard";
import styles from "@/styles/modules/pricing.module.scss";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-toastify";
import FeatureCard from "@/components/FeautureCard";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
function isValidMongoId(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

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
      <LoadingPage/>
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
       {/* <div className={styles.summarySection}>
      <h2 className={styles.summaryTitle}>Summary</h2>
      <p className={styles.summaryText}>
        We’ve carefully analyzed your app idea and business model. Based on the goals, audience,
        and feature needs you provided, these pricing plans reflect realistic scopes that ensure
        functionality, scalability, and user experience. You can always upgrade as your business
        grows or contact us for a fully custom solution.
      </p>
    </div> */}
        
      </div>
          <FeatureCard></FeatureCard>
    </div>
  );
}
