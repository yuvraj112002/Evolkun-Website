"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
import "./Profile.scss";
import Image from "next/image";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePlan, setActivePlan] = useState(null);

  const { user, isAuthenticated, isLoading, logout, checkAuthProfile } =
    useAuth();
    
  useEffect(() => {
    const fetchProfileIfNeeded = async () => {
      try {
        if (isLoading) return;

        if (!isAuthenticated) {
          router.push("/signin");
          return;
        }

        // ✅ Only proceed if we haven't already set userData
        if (user && user.name && user.email && user.plans && !userData) {
          setUserData(user);
          return;
        }

        // ✅ If userData already set, skip everything
        if (userData) return;

        const result = await checkAuthProfile();
        if (result && result.name) {
          setUserData(result);
        }
      } catch (error) {
        console.error(error);
        setError("Something went wrong while loading your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileIfNeeded();
  }, [user, userData, isAuthenticated, checkAuthProfile,router,isLoading]);

  const handleLogout = async () => {
    const data = await logout();
    toast.success(data?.message);
    router.push("/");
  };

  const handlePlanClick = (planId) => {
    setActivePlan(activePlan === planId ? null : planId);
    router.push(`/pricing/${planId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }
  if (!userData) return <LoadingSpinner />;

  return (
    <div className="business-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="user-info">
          <img
            loading="lazy"
            src={
              userData?.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                userData?.name
              )}`
            }
            alt="Profile"
            className="profile-picture"
          />
          <h1 className="user-name">{userData?.name}</h1>
          <p className="user-email">{userData?.email}</p>
        </div>

        <div className="daily-stats">
          <div className="stat-card">
            <span>Daily Plans</span>
            <div className="stat-value">{userData?.dailyPlanCount}</div>
          </div>
          <div className="stat-card">
            <span>Remaining Today</span>
            <div className="stat-value highlight">
              {" "}
              {userData?.remainingPlansToday}
            </div>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* Business Plans Section */}
      <section className="plans-section">
        <h2 className="section-title">Your Business Plans</h2>

        <div className="plans-grid">
          {userData.plans.map((plan) => (
            <div
              key={plan?._id}
              className={`plan-card ${activePlan === plan._id ? "active" : ""}`}
              onClick={() => handlePlanClick(plan?._id)}
            >
              <div className="card-header">
                <h3 className="plan-name">{plan?.businessName}</h3>
                <div className="pricing-badge">
                  From {plan?.plans?.[0]?.price}
                </div>
              </div>

              <div className="card-body">
                <div className="plan-meta">
                  <span className="meta-label">Created</span>
                  <span>{formatDate(plan?.createdAt)}</span>
                </div>

                <div className="tiers-indicator">
                  <div className="tiers-label">
                    {plan?.plans?.length} pricing tiers
                  </div>
                  <div className="tiers-visual">
                    {[...Array(plan?.plans?.length)].map((_, i) => (
                      <div
                        key={i}
                        className="tier-dot"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-actions">
                <button className="action-btn">View Details</button>
                {/* <button className="action-btn primary">Edit Plan</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
