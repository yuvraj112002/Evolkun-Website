"use client";
import { useState, useEffect } from "react";
import "./Profile.scss";
import { useAuth } from "@/context/UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";

  
const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          console.log("✅ Using existing user from context");
          setUserData(user);
          return;
        }

        // ✅ If userData already set, skip everything
        if (userData) return;

        console.log("📡 Fetching from /api/profile...");
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
  }, [user, userData, isAuthenticated, isLoading]);

  const handleLogout = async () => {
    const data = await logout();
    toast.success(data?.message);
    router.push("/");
  };

  const handlePlanClick = (planId) => {
    console.log("Clicked Plan ID:", planId);
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
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={
              userData.profileImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                userData.name
              )}`
            }
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-details">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            <div className="plan-counts">
              <span>Daily Plans: {userData.dailyPlanCount}</span>
              <span>Remaining Today: {userData.remainingPlansToday}</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="home-button" onClick={() => router.push("/")}>
            Home
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="business-plans-section">
        <h3>Your Business Plans</h3>

        {userData.plans.length === 0 ? (
          <p className="no-plans">You don't have any business plans yet.</p>
        ) : (
          <div className="plans-grid">
            {userData.plans.map((plan) => (
              <div
                key={plan._id}
                className="business-plan-card"
                onClick={() => handlePlanClick(plan._id)}
              >
                <h4>{plan.businessName}</h4>
                <p className="plan-created">
                  Created: {formatDate(plan.createdAt)}
                </p>
                <div className="plan-summary">
                  <span>{plan.plans.length} pricing tiers</span>
                  <span>From {plan.plans[0].price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

     

    </div>
  );
};

export default Profile;
